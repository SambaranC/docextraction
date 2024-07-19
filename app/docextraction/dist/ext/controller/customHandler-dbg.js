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
    }

} 
});