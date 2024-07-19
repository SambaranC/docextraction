const cds = require('@sap/cds')

/**
 * Implementation for Document extraction service
 */
module.exports = cds.service.impl(async function (srv) {


    srv.on("documentExtraction", async (request, next) => {

        let docxService = await cds.connect.to("DocumentExtractor");

        try {

            let result = await docxService.send({
                method: "GET",
                path: `/document-information-extraction/v1/capabilities`,
              });

              console.log("result" , JSON.stringify(result));
              
             
         return result;
        }catch(oError){


        }
       

      });
    
});
