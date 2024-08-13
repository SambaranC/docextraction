sap.ui.define([
    "sap/m/MessageToast",
    "sap/m/MessageBox",
    "sap/ui/export/Spreadsheet"
], function (MessageToast, MessageBox, Spreadsheet) {
    'use strict';
    const myCore = sap.ui.getCore();

return{
    
    onPressExtraction: function (oEvent) {
        var that = this;

        var sUrl = myCore.myCustomObject.getData().myBaseURI + "extraction/documentExtraction()";

        console.log("into extraction")

        jQuery.ajax({
            type: "GET",
            contentType: "application/json",
            url: sUrl,
            dataType: "json",
            async: false,
            success: function (success) {
                sap.m.MessageToast.show("Success reading extraction api");
            },
            error: function (error) {
                sap.m.MessageToast.show("Erro reading extraction api");
            }
        });
    },

    onPressUpload: async function (oEvent) {
     
        this.myDialogSource = "Upload";
        if (!this.myUploadFragment || this.myUploadFragment.bIsDestroyed === true) {
            this.myUploadFragment = sap.ui.xmlfragment("docextraction.ext.fragment.Upload", this);
            this.routing.getView().addDependent(this.myUploadFragment);
        }
        this.myUploadFragment.open();

        // this.oDialog ??= await this.loadFragment({
        //     name: "docextraction.ext.fragment.Upload"
        // });
    
        // this.oDialog.open();

    },

    // handleUploadComplete: function(oEvent) {
    //     MessageToast.show("onuploadComplete");
    //     var sResponse = oEvent.getParameter("response"),
    //         aRegexResult = /\d{4}/.exec(sResponse),
    //         iHttpStatusCode = aRegexResult && parseInt(aRegexResult[0]),
    //         sMessage;

    //     if (sResponse) {
    //         sMessage = iHttpStatusCode === 204 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
    //         MessageToast.show(sMessage);
    //     }
    // },

    handleUploadComplete(oEvent) {
        const iStatus = oEvent.getParameter("status")
        let sMsg = ""
        if (iStatus === 204) {
            sMsg = `Return Code ${iStatus} - Success`
            // oEvent.getSource().setValue("")
            // this.byId("ListOfItems")
            //     .getBinding("items")
            //     .refresh()
        } else {
            sMsg = `Error: ${oEvent.getParameter("response")}`
        }

        MessageToast.show(sMsg)
    },

    // handleUploadPress: function() {
      
    //     var oFileUploader = myCore.byId("fileUploader");
    //     oFileUploader.checkFileReadable().then(function() {
    //         oFileUploader.upload();
    //     }, function(error) {
    //         MessageToast.show("The file cannot be read. It may have changed.");
    //     }).then(function() {
    //         MessageToast.show("onupload");
    //         oFileUploader.clear();
    //     });
    // },

    handleUploadPress(oEvent) {
        const oFileUploader = myCore.byId("fileUploader")
        if (oFileUploader.getValue() === "") {
            return MessageToast.show("No file")
        }

        const sUrl =  myCore.myCustomObject.getData().myBaseURI + oFileUploader.getUploadUrl() ;
        // lastModified
        // lastModifiedDate
        // name
        // size
        // type
        const oUploadedFile = oFileUploader.oFileUpload.files[0]

        // const _fileLastModified = oUploadedFile.lastModifiedDate
        //     ? oUploadedFile.lastModifiedDate.toISOString()
        //     : new Date().toISOString()

        // no primary key needed for payload
        // cap aspect cuid auto-inserts one
        const oPayload = {
             mediaType: oUploadedFile.type,
             fileName: oUploadedFile.name,
            // size: oUploadedFile.size,
            // fileLastModified: _fileLastModified
        }
        console.log(JSON.stringify(oPayload));
        // const oPayload = {};
        // create entry in persistence for uploaded item
        // fetch(`${oFileUploader.getUploadUrl()}`, {
         fetch(`${sUrl}`, {
            method: "POST",
            body: JSON.stringify(oPayload),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                // exit early if a technical http error happened
                if (!response.ok) {
                    throw new Error(`${response.status} - ${response.statusText}`)
                }
                return response.json() // make response human readable -> also a Promise!
            })
            .then(decodedResponse => {
                // decodedResponse:
                // BE provided auto-insert style an ID
                // and returns it for the before-happended POST

                // upload of the actual item content!
                // (via PUT in custom control FileUploader)
                // (also note the useMultipart=false setting on FileUploader!)
                oFileUploader.setUploadUrl(`${sUrl}(${decodedResponse.ID})/content`)
                oFileUploader.setSendXHR(true)
                oFileUploader.upload()
            })
            .catch(err => {
                MessageToast.show(`Error: ${err}`)
            })
    },

    onCloseDialog: function (oEvent) {
        this.myUploadFragment.destroy();
    }

} 
});