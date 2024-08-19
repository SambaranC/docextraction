const cds = require('@sap/cds')

const { ql: { INSERT }, utils: { uuid } } = cds

const createDraftAdminData = async ({ context , draftAdministrativeData }) => {
  const { timestamp, user: { id } } = context
  /*  const insertQuery =
      INSERT
        .into(draftAdministrativeData)
        .entries([{
          DraftUUID: uuid(),
          CreationDateTime: timestamp,
          CreatedByUser: id,
          DraftIsCreatedByMe: true,
          LastChangeDateTime: timestamp,
          LastChangedByUser: id,
          InProcessByUser: id,
          DraftIsProcessedByMe: true
        }])
  //  const db = await cds.connect.to('db')
  //  const insertResult = await db.run(insertQuery)*/
  const insertResult = await INSERT
    .into(draftAdministrativeData)
    .entries([{
      DraftUUID: uuid(),
      CreationDateTime: timestamp,
     CreatedByUser: id,
      DraftIsCreatedByMe: true,
      LastChangeDateTime: timestamp,
      LastChangedByUser: id,
     InProcessByUser: id,
      DraftIsProcessedByMe: true
    }]);
  const [{ DraftUUID }] = [...insertResult]
  return DraftUUID
}

const deleteDraftAdminData = async ({ ID, draftEntity, draftAdministrativeData }) => {
  //const { timestamp, user: { id } } = context
  /* const selectQuery =
     SELECT
       .one
       .from(draftEntity.drafts.name)
       .columns(['DraftAdministrativeData_DraftUUID'])
       .where({
         ID, // REVISE: assuming cuid aspect
         IsActiveEntity: false //check for this to be true and then delete
       })
   const db = await cds.connect.to('db')
   const draft = await db.run(selectQuery) */
  const draft = await SELECT
    .one
    .from(draftEntity.drafts.name)
    .columns(['DraftAdministrativeData_DraftUUID'])
    .where({
      ID, // REVISE: assuming cuid aspect
      IsActiveEntity: false //check for this to be true and then delete
    })

  /*  const deleteQuery =
      DELETE
        .from(draftAdministrativeData)
        .where({ DraftUUID: draft.DraftAdministrativeData_DraftUUID }) 
  
    return await db.run(deleteQuery) */
  return await DELETE
    .from(draftAdministrativeData)
    .where({ DraftUUID: draft.DraftAdministrativeData_DraftUUID });

}

const deleteDraft = async ({ ID, draftEntity }) => {
  /* const deleteQuery =
     DELETE
       .from(draftEntity.drafts.name)
       .where({ ID: ID, IsActiveEntity: false })
 
   const db = await cds.connect.to('db')
   return await db.run(deleteQuery) */

  return await DELETE
    .from(draftEntity.drafts.name)
    .where({ ID: ID, IsActiveEntity: false });


}

const createDraft = async ({ DraftUUID, draftEntity, draftData }) => {
  const ID = uuid() // REVISE: assuming cuid aspect
  /*  const insertQuery =
      INSERT
        .into(draftEntity.drafts.name)
        .entries([{
          ID, // REVISE: assuming cuid aspect
          DraftAdministrativeData_DraftUUID: DraftUUID,
          HasActiveEntity: false,
          HasDraftEntity: false,
          IsActiveEntity: false,
          actionCode: 'I',
          ...draftData
        }])
    const db = await cds.connect.to('db')
    await db.run(insertQuery) */
  await INSERT
    .into(draftEntity.drafts.name)
    .entries([{
      ID, // REVISE: assuming cuid aspect
      DraftAdministrativeData_DraftUUID: DraftUUID,
      HasActiveEntity: false,
      HasDraftEntity: false,
      IsActiveEntity: false,
      ...draftData
    }]);
  /* const selectColumns =
     Object.values(draftEntity.elements)
       .filter(({ type, virtual = false }) => type !== 'cds.Association' && !virtual && type !== 'cds.Composition')
       .map(({ name }) => name)
   const selectQuery =
     SELECT
       .one
       .from(draftEntity.drafts.name)
       .columns(['ID', 'IsActiveEntity'])    //(selectColumns)
       .where({
         ID, // REVISE: assuming cuid aspect
         IsActiveEntity: false
       })
   const draft = await db.run(selectQuery) */
  const draft = await SELECT
    .one
    .from(draftEntity.drafts.name)
    .columns(['ID', 'IsActiveEntity'])    //(selectColumns)
    .where({
      ID, // REVISE: assuming cuid aspect
      IsActiveEntity: false
    })
  return draft
}

// tmp. placeholder for https://pages.github.tools.sap/cap/docs/node.js/app-services#srvnew--namespace--draft
module.exports = {
  async createDraft({ req, draftEntity, draftAdministrativeData, draftData }) {
    const { context } = req
    const DraftUUID = await createDraftAdminData({ context, draftAdministrativeData })
    const draft = await createDraft({ DraftUUID, draftEntity, draftData })
    return draft
  },

  async deleteDraft({ ID, draftEntity, draftAdministrativeData }) {
    await deleteDraftAdminData({ID, draftEntity, draftAdministrativeData })
    await deleteDraft({ ID, draftEntity })
  }
}
