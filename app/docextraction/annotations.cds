using DocumentExtractionService as service from '../../srv/documentextraction-service';
annotate service.Projects with @(
    UI.FieldGroup #GeneratedGroup: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'Project ID',
                Value: projectExternalId,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Person Responsible',
                Value: responsiblePersonName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Applicant Number',
                Value: applicantName,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Plant',
                Value: plant,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Start Date',
                Value: plannedStartDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'End Date',
                Value: plannedEndDate,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Gate Keeper',
                Value: gatekeeper,
            },
        ],
    },
    UI.Facets                    : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet1',
            Label : 'General Information',
            Target: '@UI.FieldGroup#GeneratedGroup',
        },
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'GeneratedFacet2',
            Label : 'WBS Elements',
            Target: 'toWBSElements/@UI.LineItem',
        },
    ],
    UI.LineItem                  : [
        {
            $Type: 'UI.DataField',
            Label: 'Project ID',
            Value: projectExternalId,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Person Responsible',
            Value: responsiblePersonName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Applicant Number',
            Value: applicantName,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Plant',
            Value: plant,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Start Date',
            Value: plannedStartDate,
        },
        {
            $Type: 'UI.DataField',
            Label: 'End Date',
            Value: plannedEndDate,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Gate Keeper',
            Value: gatekeeper,
        },
    ],
);


annotate service.WBSElements with @(
    UI.FieldGroup #GeneralInformation: {
        $Type: 'UI.FieldGroupType',
        Data : [
            {
                $Type: 'UI.DataField',
                Label: 'WBS Element',
                Value: wbsElementExternalID,
            },
            {
                $Type: 'UI.DataField',
                Label: 'WBS Level',
                Value: wbsElementHierarchyLevel,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Description',
                Value: wbsDescription,
            },
            {
                $Type: 'UI.DataField',
                Label: 'Cost Center',
                Value: responsibleCostCenter,
            },
            {
                $Type: 'UI.DataField',
                Label: 'FM Number',
                Value: fmNumber,
            },
            {
                $Type: 'UI.DataField',
                Label: 'AFE Number',
                Value: afeNumber,
            },

        ],
    },
    UI.Facets                        : [{
        $Type : 'UI.ReferenceFacet',
        ID    : 'GeneralInformation',
        Label : 'WBS Element',
        Target: '@UI.FieldGroup#GeneralInformation',
    },

    ],
    UI.LineItem                      : [
        {
            $Type: 'UI.DataField',
            Label: 'WBS Element',
            Value: wbsElementExternalID,
        },
        {
            $Type: 'UI.DataField',
            Label: 'WBS Level',
            Value: wbsElementHierarchyLevel,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Description',
            Value: wbsDescription,
        },
        {
            $Type: 'UI.DataField',
            Label: 'Cost Center',
            Value: responsibleCostCenter,
        },
        {
            $Type: 'UI.DataField',
            Label: 'FM Number',
            Value: fmNumber,
        },
        {
            $Type: 'UI.DataField',
            Label: 'AFE Number',
            Value: afeNumber,
        },
    ],
);
