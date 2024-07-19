sap.ui.define(['sap/ui/core/mvc/ControllerExtension'], function (ControllerExtension) {
	'use strict';

	return ControllerExtension.extend('docextraction.ext.controller.CustomProjectsListPageExtension', {
		// this section allows to extend lifecycle hooks or hooks provided by Fiori elements
		override: {
			/**
			 * Called when a controller is instantiated and its View controls (if available) are already created.
			 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
			 * @memberOf docextraction.ext.controller.CustomProjectsListPageExtension
			 */
			onInit: function (oEvent) {
				// you can access the Fiori elements extensionAPI via this.base.getExtensionAPI
				var oModel = this.base.getExtensionAPI().getModel();
				//this.base.getAppComponent().getRouter().getRoute("ProjectsList").attachPatternMatched(this.onHandleProjectsListPagePatternMatched, this);
				if (!sap.ui.getCore().myCustomObject) {
					sap.ui.getCore().myCustomObject = new sap.ui.model.json.JSONModel();
					sap.ui.getCore().myCustomObject.getData().myBaseURI = this.base.getAppComponent().getManifestObject()._oBaseUri._string;
				}
			},
			onBeforeRendering: function (oEvent) {
				// sap.m.MessageToast.show("onBeforeRenderingProjectListPage");
			},
			onAfterRendering: function (oEvent) {
				// sap.m.MessageToast.show("onAfterRenderingProjectListPage");
			},
			onExit: function (oEvent) {
				// sap.m.MessageToast.show("onExitProjectListPage");
			}
		}

	});
});
