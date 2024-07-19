namespace demo.com.projectsystem;

using {
    cuid,
    managed,
} from '@sap/cds/common';

entity Projects : cuid, managed {

    projectExternalId     : String;
    responsiblePersonName : String;
    applicantName         : String;
    plant                 : Integer;
    plannedStartDate      : Date;
    plannedEndDate        : Date;
    gatekeeper            : String;

    toWBSElements         : Composition of many WBSElements
                                on toWBSElements.toProject = $self;

}


entity WBSElements : cuid, managed {

    wbsElementExternalID     : String;
    wbsElementHierarchyLevel : Integer;
    wbsDescription           : String;
    responsibleCostCenter    : String;
    fmNumber                 : String;
    afeNumber                : String;
    toProject                : Association to one Projects;
}
