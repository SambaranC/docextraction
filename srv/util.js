const cds = require('@sap/cds');
const draftUtil = require("./draft_util");

module.exports = {



  async statuscheck(jobId, request) {

    const { DocumentExtractionService } = cds.services;

    const {
      Projects,
      WBSElements,
      DraftAdministrativeData,
    } = DocumentExtractionService.entities;

    console.log("into the status check");

    let docxService = await cds.connect.to("DocumentExtractor");

    let stop = false;
    let rstatus = await docxService.send({
      method: "GET",
      path: `/document-information-extraction/v1/document/jobs/` + jobId,

    });

    console.log("status", JSON.stringify(rstatus));
    if (rstatus.status === "DONE") {

      stop = true;

      let aProject = rstatus.extraction.headerFields;
      let oProject = {};

      for (let i = 0; i < aProject.length; i++) {

        oProject[aProject[i].name] = aProject[i].value;

      }

      console.log("project data ", JSON.stringify(oProject));

      let aWbsItems = rstatus.extraction.lineItems;

      let aWBS = [];
     


      for (let j = 0; j < aWbsItems.length; j++) {

        let oWBS = {};
        for (let k = 0; k < aWbsItems[j].length; k++) {

          oWBS[aWbsItems[j][k].name] = aWbsItems[j][k].value;

        }
        aWBS.push(oWBS);
      }

      console.log("awbs", JSON.stringify(aWBS));


      try {
        const draft = await draftUtil.createDraft({

          req: request,
          draftEntity: Projects,
          draftAdministrativeData: DraftAdministrativeData,
          draftData: {
            projectExternalId: oProject.projectExternalId,
            responsiblePersonName: oProject.responsiblePersonName,
            applicantName: oProject.applicantName,
            plant: oProject.plant,
            plannedStartDate: oProject.plannedStartDate,
            plannedEndDate: oProject.plannedEndDate,
            gatekeeper: oProject.gatekeeper,
          },
        });

        console.log("Project draft", JSON.stringify(draft));

        for (let draftWBSEntr of aWBS) {
          
         console.log("WBS ", JSON.stringify(draftWBSEntr));

          let wbsdraft = await draftUtil.createDraft({
            req: request,
            draftEntity: WBSElements,
            draftAdministrativeData: DraftAdministrativeData,
            draftData: {
              wbsElementExternalID: draftWBSEntr.wbsElementExternalID,
              wbsElementHierarchyLevel: draftWBSEntr.wbsElementHierarchyLevel,
              wbsDescription: draftWBSEntr.wbsDescription,
              responsibleCostCenter: draftWBSEntr.responsibleCostCenter,
              fmNumber: draftWBSEntr.fmNumber,
              afeNumber: draftWBSEntr.afeNumber,
              toProject_ID: draft.ID,
            },
          });

          console.log("WBS draft", JSON.stringify(wbsdraft));
        }

      } catch (oError) {

        console.log("error1", JSON.stringify(oError));

      }


    }

    return stop;
  }




}



