sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'docextraction/test/integration/FirstJourney',
		'docextraction/test/integration/pages/ProjectsList',
		'docextraction/test/integration/pages/ProjectsObjectPage',
		'docextraction/test/integration/pages/WBSElementsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ProjectsList, ProjectsObjectPage, WBSElementsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('docextraction') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheProjectsList: ProjectsList,
					onTheProjectsObjectPage: ProjectsObjectPage,
					onTheWBSElementsObjectPage: WBSElementsObjectPage
                }
            },
            opaJourney.run
        );
    }
);