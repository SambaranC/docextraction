using {demo.com.projectsystem as projectsystem} from '../db/project-schema';

service DocumentExtractionService @(path:'/extraction') {


    @odata.draft.enabled
    @(Capabilities: {
        InsertRestrictions.Insertable: true,
        UpdateRestrictions.Updatable : true,
        DeleteRestrictions.Deletable : true
    })
    entity Projects    as projection on projectsystem.Projects;


  
    @(Capabilities: {
        InsertRestrictions.Insertable: true,
        UpdateRestrictions.Updatable : true,
        DeleteRestrictions.Deletable : true
    })
    entity WBSElements as projection on projectsystem.WBSElements;

    function documentExtraction()  returns String;

}
