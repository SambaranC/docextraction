const cds = require('@sap/cds');
const { request } = require('http');
const { Readable, PassThrough } = require('stream');
var FormData = require("form-data");

const statusCheck = require("./util");

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

      console.log("result", JSON.stringify(result));


      return result;
    } catch (oError) {


    }


  });

  // srv.on("UPDATE", "ProjectAttachments", async (request, next) => {

  //   console.log("intofile upload");
  //  // let docxService = await cds.connect.to("DocumentExtractor");

  //   try {

  //       // let result = await docxService.send({
  //       //     method: "GET",
  //       //     path: `/document-information-extraction/v1/capabilities`,
  //       //   });

  //       //   console.log("result" , JSON.stringify(result));


  //    return;
  //   }catch(oError){


  //   }


  // });


  srv.before("UPDATE", "ProjectAttachments", async (request) => {

    const url = request._.req.path;
    const { ProjectAttachments } = this.entities;

    if (url.includes('content')) {

      console.log("into content update");

      const db = await cds.connect.to('db');

      const id = request.data.ID;

      const obj = await db.read(ProjectAttachments, id);

      if (!obj) {
        request.reject(404, "No data found");
        return;
      }

      // obj.fileName = request.headers.fileName;
      obj.mediaType = request.headers['content-type'];
      obj.url = `/extraction/ProjectAttachments(${id})/content`

      const stream = new PassThrough();

      const chunks = [];
     // await new Promise((resolve, reject) => {
    const promise = new Promise(function (resolve, reject) { 
      request.data.content.pipe(stream);

      stream.on("data", (chunk) => {
        chunks.push(chunk);
      });

      stream.on("end", async () => {

        obj.content = Buffer.concat(chunks);
        await db.update(ProjectAttachments, id).with(obj);
        console.log("into the stream");

        // FormData
        let form = new FormData();

        form.append("file", obj.content, obj.fileName);

        const options = {
          "clientId": "default",
          "documentType": "custom",
          "schemaName": "afe_schema",
          "templateId": "detect",
          "receivedDate": "2024-08-13",
          "enrichment": {}
        }

       
        form.append('options', JSON.stringify(options))

        const data = form.getBuffer();
        const headers = form.getHeaders();
        
        let docxService = await cds.connect.to("DocumentExtractor");

        try {

          let result = await docxService.send({
            method: "POST",
            path: `/document-information-extraction/v1/document/jobs`,            
            data,
            headers,
          });

         console.log("result", JSON.stringify(result));
          const jobId =  result.id;

          console.log("jobId" , jobId);
         
         await new Promise(resolve => setTimeout(resolve, 40000));

         let status = await statusCheck.statuscheck(jobId,request);
         
         if(status) {

         console.log("we can call for extraction");
         resolve();
         }

        } catch (oError) {
           console.log("error" , JSON.stringify(oError)) ;
           reject();

        }
      })

      });

      promise
      .then(function () {
          console.log("Promise resolved successfully");
          return;
      })
      .catch(function () {
          console.log("Promise is rejected");
      });

     
    }


  });



});
