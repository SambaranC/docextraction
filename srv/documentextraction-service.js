const cds = require('@sap/cds');
const { request } = require('http');
const {Readable, PassThrough} = require('stream')

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


      srv.on("UPDATE", "ProjectAttachments", async (request) => {
      
        const url = request._.req.path;
        const {ProjectAttachments} = this.entities;

        if(url.includes('content')){

          console.log("into content update");

        const db = await cds.connect.to('db');

        const id = request.data.ID;

        const obj = await db.read(ProjectAttachments,id);

        if(!obj) {
          request.reject(404, "No data found");
          return;
        }

       // obj.fileName = request.headers.fileName;
        obj.mediaType = request.headers['content-type'];
        obj.url = `/extraction/ProjectAttachments(${id})/content`

        const stream = new PassThrough();

        const chunks = [];
   
        request.data.content.pipe(stream);

        stream.on("data",  (chunk) => {
          chunks.push(chunk);
        });

        stream.on("end", async() => {
          
          obj.content = Buffer.concat(chunks).toString('base64');
          await db.update(ProjectAttachments ,id).with(obj);
          console.log("into the stream");
          })

    
     
      }

     
      });

       

});
