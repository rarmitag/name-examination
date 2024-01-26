// import { defineStore } from 'pinia'
// import { stateModel } from '@/store/state'
import { Status } from '~/enums/nr-status'
//#import { ...interfaces }
import type {
  Trademark,
  Comment,
  Condition,
  Conflict,
  ConflictList,
  ConflictListItem,
  CorpConflict,
  History,
  Macro,
  NameRequestConflict,
  TrademarkApiResponse,
  NameChoice,
  RequestType,
  RequestTypeRule,
  Jurisdiction,
  Transaction,
} from '~/types'

export   const useStore = defineStore('examine', () => {
  // State Model
  const state = ref({ ...stateModel })
  
  function loadCompanyInfo(state, dbcompanyInfo) {
    if (state.nrData && state.nrData.consent_dt) {
      state.nrData.consent_dt = null
    }
    if (state.nrData && state.nrData.consentFlag) {
      state.nrData.consentFlag = null
    }
    if (state.consentDateForEdit) {
      state.consentDateForEdit = null
    }
    if ( !dbcompanyInfo || !dbcompanyInfo.names ) return
    state.nrData = dbcompanyInfo

    if ( dbcompanyInfo.names.length == 0 ) {
      return
    }
    // clear name choices 2 and 3 in case they are blank - ie: don't keep previous NR's data
    state.compInfo.compNames.compName2.name = null
    state.compInfo.compNames.compName2.state = null
    state.compInfo.compNames.compName2.consumptionDate = null
    state.compInfo.compNames.compName2.corpNum = null
    state.compInfo.compNames.compName2.conflict1 = null
    state.compInfo.compNames.compName2.conflict2 = null
    state.compInfo.compNames.compName2.conflict3 = null
    state.compInfo.compNames.compName2.conflict1_num = null
    state.compInfo.compNames.compName2.conflict2_num = null
    state.compInfo.compNames.compName2.conflict3_num = null
    state.compInfo.compNames.compName2.decision_text = null
    state.compInfo.compNames.compName3.name = null
    state.compInfo.compNames.compName3.state = null
    state.compInfo.compNames.compName3.consumptionDate = null
    state.compInfo.compNames.compName3.corpNum = null
    state.compInfo.compNames.compName3.conflict1 = null
    state.compInfo.compNames.compName3.conflict2 = null
    state.compInfo.compNames.compName3.conflict3 = null
    state.compInfo.compNames.compName3.conflict1_num = null
    state.compInfo.compNames.compName3.conflict2_num = null
    state.compInfo.compNames.compName3.conflict3_num = null
    state.compInfo.compNames.compName3.decision_text = null

    // clear current name choice, to be reset by new data below
    state.currentNameObj = null
    state.currentName = null
    state.currentChoice = null

    for ( let record of dbcompanyInfo.names ) {

      switch (record.choice) {
        case 1:
          state.compInfo.compNames.compName1.choice = record.choice
          state.compInfo.compNames.compName1.name = record.name
          state.compInfo.compNames.compName1.state = record.state
          state.compInfo.compNames.compName1.consumptionDate = record.consumptionDate
          state.compInfo.compNames.compName1.corpNum = record.corpNum
          state.compInfo.compNames.compName1.conflict1 = record.conflict1
          state.compInfo.compNames.compName1.conflict2 = record.conflict2
          state.compInfo.compNames.compName1.conflict3 = record.conflict3
          state.compInfo.compNames.compName1.conflict1_num = record.conflict1_num
          state.compInfo.compNames.compName1.conflict2_num = record.conflict2_num
          state.compInfo.compNames.compName1.conflict3_num = record.conflict3_num
          state.compInfo.compNames.compName1.decision_text = record.decision_text
          state.compInfo.compNames.compName1.comment = record.comment

          // if this name is not yet examined or it is approved (in case of reset/re-open), set it as current name
          if ( record.state == 'NE' || record.state == 'APPROVED' || record.state == 'CONDITION' ) {

            this.dispatch( 'setCurrentName', record )
          }

          break
        case 2:
          state.compInfo.compNames.compName2.choice = record.choice
          state.compInfo.compNames.compName2.name = record.name
          state.compInfo.compNames.compName2.state = record.state
          state.compInfo.compNames.compName2.consumptionDate = record.consumptionDate
          state.compInfo.compNames.compName2.corpNum = record.corpNum
          state.compInfo.compNames.compName2.conflict1 = record.conflict1
          state.compInfo.compNames.compName2.conflict2 = record.conflict2
          state.compInfo.compNames.compName2.conflict3 = record.conflict3
          state.compInfo.compNames.compName2.conflict1_num = record.conflict1_num
          state.compInfo.compNames.compName2.conflict2_num = record.conflict2_num
          state.compInfo.compNames.compName2.conflict3_num = record.conflict3_num
          state.compInfo.compNames.compName2.decision_text = record.decision_text
          state.compInfo.compNames.compName2.comment = record.comment

          // if this name is not yet examined or it is approved (in case of reset/re-open), set it as current name
          if ( ( record.state == 'NE' || record.state == 'APPROVED' || record.state == 'CONDITION' ) &&
            ( record.choice < state.currentChoice || state.currentChoice == null ) )
          {

            this.dispatch( 'setCurrentName', record )
          }

          break
        case 3:
          state.compInfo.compNames.compName3.choice = record.choice
          state.compInfo.compNames.compName3.name = record.name
          state.compInfo.compNames.compName3.state = record.state
          state.compInfo.compNames.compName3.consumptionDate = record.consumptionDate
          state.compInfo.compNames.compName3.corpNum = record.corpNum
          state.compInfo.compNames.compName3.conflict1 = record.conflict1
          state.compInfo.compNames.compName3.conflict2 = record.conflict2
          state.compInfo.compNames.compName3.conflict3 = record.conflict3
          state.compInfo.compNames.compName3.conflict1_num = record.conflict1_num
          state.compInfo.compNames.compName3.conflict2_num = record.conflict2_num
          state.compInfo.compNames.compName3.conflict3_num = record.conflict3_num
          state.compInfo.compNames.compName3.decision_text = record.decision_text
          state.compInfo.compNames.compName3.comment = record.comment

          // if this name is not yet examined or it is approved (in case of reset/re-open), set it as current name
          if ( ( record.state == 'NE' || record.state == 'APPROVED' || record.state == 'CONDITION' ) &&
            ( record.choice < state.currentChoice || state.currentChoice == null ) )
          {
            this.dispatch( 'setCurrentName', record )
          }
          break

        default:
          break
      }
    }

    //if no currentName selected choose 1st
    if ( state.currentName == null ) {

      this.dispatch( 'setCurrentName', dbcompanyInfo.names[0] )
    }

    state.currentState = dbcompanyInfo.state
    state.previousStateCd = dbcompanyInfo.previousStateCd
    state.compInfo.requestType = dbcompanyInfo.requestTypeCd
    state.compInfo.entityTypeCd = dbcompanyInfo.entity_type_cd
    state.compInfo.requestActionCd = dbcompanyInfo.request_action_cd

    if (dbcompanyInfo.consent_dt && moment(dbcompanyInfo.consent_dt).isValid()) {
      let dateString = new moment(dbcompanyInfo.consent_dt).format('YYYY-MM-DD')
      state.consentDateForEdit = dateString
    }

    // if the current state is not INPROGRESS, HOLD, or DRAFT clear any existing name record in currentNameObj
    if ( !['INPROGRESS', 'HOLD', 'DRAFT'].includes( state.currentState ) ) {

      this.dispatch( 'setCurrentName', {} )
    }

    // we keep the original data so that if fields exist that we do not use, we don't lose that
    // data when we put new data
    if ( dbcompanyInfo.applicants != '' ) {
      state.applicantOrigData = dbcompanyInfo.applicants
    }
    else {
      state.applicantOrigData = {
        'clientFirstName': null,
        'clientLastName': null,
        'firstName': null,
        'middleName': null,
        'lastName': null,
        'addrLine1': null,
        'addrLine2': null,
        'addrLine3': null,
        'city': null,
        'stateProvinceCd': null,
        'postalCd': null,
        'countryTypeCd': null,
        'contact': null,
        'phoneNumber': null,
        'emailAddress': null,
        'faxNumber': null,
      }
    }
    state.applicantInfo.clientName.firstName = dbcompanyInfo.applicants.clientFirstName
    state.applicantInfo.clientName.lastName = dbcompanyInfo.applicants.clientLastName
    state.applicantInfo.applicantName.firstName = dbcompanyInfo.applicants.firstName
    state.applicantInfo.applicantName.middleName = dbcompanyInfo.applicants.middleName
    state.applicantInfo.applicantName.lastName = dbcompanyInfo.applicants.lastName
    state.applicantInfo.contactInfo.addressLine1 = dbcompanyInfo.applicants.addrLine1
    state.applicantInfo.contactInfo.addressLine2 = dbcompanyInfo.applicants.addrLine2
    state.applicantInfo.contactInfo.addressLine3 = dbcompanyInfo.applicants.addrLine3
    state.applicantInfo.contactInfo.city = dbcompanyInfo.applicants.city
    state.applicantInfo.contactInfo.province = dbcompanyInfo.applicants.stateProvinceCd
    state.applicantInfo.contactInfo.postalCode = dbcompanyInfo.applicants.postalCd
    state.applicantInfo.contactInfo.country = dbcompanyInfo.applicants.countryTypeCd
    state.applicantInfo.contactInfo.contactName = dbcompanyInfo.applicants.contact
    state.applicantInfo.contactInfo.phone = dbcompanyInfo.applicants.phoneNumber
    state.applicantInfo.contactInfo.email = dbcompanyInfo.applicants.emailAddress
    state.applicantInfo.contactInfo.fax = dbcompanyInfo.applicants.faxNumber

    state.additionalCompInfo.jurisdiction = dbcompanyInfo.xproJurisdiction
    state.additionalCompInfo.natureOfBussiness = dbcompanyInfo.natureBusinessInfo
    //state.details = dbcompanyInfo.details
    state.additionalInfo = dbcompanyInfo.additionalInfo
    state.internalComments = dbcompanyInfo.comments

    state.additionalCompInfo.nr_status = dbcompanyInfo.state
    state.examiner = dbcompanyInfo.userId
    state.priority = dbcompanyInfo.priorityCd
    //state.reservationCount = dbcompanyInfo.reservationCount

    if ( dbcompanyInfo.expirationDate && moment( dbcompanyInfo.expirationDate ).isValid() ) {
      state.expiryDate = moment( dbcompanyInfo.expirationDate ).format( 'YYYY-MM-DD' )
    }
    else {
      state.expiryDate = null
    }

    if ( dbcompanyInfo.submittedDate && moment( dbcompanyInfo.submittedDate )
    .isValid() )
    {
      state.submittedDate = moment( dbcompanyInfo.submittedDate )
      .format( 'YYYY-MM-DD, h:mma' )
    }
    else {
      state.submittedDate = null
    }

    state.lastUpdate = dbcompanyInfo.lastUpdate

    state.submitCount = dbcompanyInfo.submitCount
    state.previousNr = dbcompanyInfo.previousNr
    state.corpNum = dbcompanyInfo.corpNum
    state.furnished = dbcompanyInfo.furnished
    state.hasBeenReset = dbcompanyInfo.hasBeenReset

    // cycle through nwpta entries
    // - first clear existing nwpta data that may persist from previous NR
    state.additionalCompInfo.nwpta_ab = {
      partnerJurisdictionTypeCd: null,
      partnerName: null,
      partnerNameDate: null,
      partnerNameNumber: null,
      partnerNameTypeCd: null,
    }
    state.additionalCompInfo.nwpta_sk = {
      partnerJurisdictionTypeCd: null,
      partnerName: null,
      partnerNameDate: null,
      partnerNameNumber: null,
      partnerNameTypeCd: null,
    }
    for ( let record of dbcompanyInfo.nwpta ) {

      // convert date from long form to YYYY-MM-DD
      if ( record.partnerNameDate ) {
        var nwpta_date = new moment( record.partnerNameDate )
        record.partnerNameDate = nwpta_date.clone()
                                           .format( 'YYYY-MM-DD' )
      }

      if ( record.partnerJurisdictionTypeCd == 'AB' ) state.additionalCompInfo.nwpta_ab = record
      if ( record.partnerJurisdictionTypeCd == 'SK' ) state.additionalCompInfo.nwpta_sk = record
    }

    // convert Expiry Date from timestamp to YYYY-MM-DD string for editing
    if ( state.expiryDate ) {
      state.expiryDateForEdit = state.expiryDate
    }
    else {
      state.expiryDateForEdit = null
    }
    if ( state.currentState === 'INPROGRESS' ) {
      state.is_making_decision = true
    }

    // load payment data
    this.dispatch('getPayments', null)
  }  
  
  //**  END LOADCOMPANYINFO  **

  const priority = computed(() => {
      return state.priority
  })
  
  const inProgress = computed(() => {
      // set flag indicating whether you own this NR and it's in progress
      if ( state.currentState == 'INPROGRESS' && state.examiner == state.userId ) {
          return true
      } else {
          return false
      }
  })
  
  const is_complete = computed(() => {
      // indicates a complete NR
      if (['APPROVED', 'REJECTED', 'CONDITIONAL', 'CONSUMED', 'COMPLETED', 'CANCELLED', 'HISTORICAL', 'EXPIRED'].indexOf(
        state.currentState ) >= 0 )
      {
          return true
      }
      else {
          return false
      }
  })  
  
  //*
  const furnished = ref<'Y' | 'N'>('N')
  
  const exactMatchesConflicts = ref<Array<ConflictListItem>>([])  
      
  async function getConflictInfo(item: ConflictListItem) {
      corpConflictJSON.value = undefined
      namesConflictJSON.value = undefined
      const conflict = conflicts.value.filter(
        (conflict) => conflict.nrNumber === item.nrNumber
      )[0]
      if (item.source === 'CORP') {
        corpConflictJSON.value = conflict as CorpConflict
      } else {
        namesConflictJSON.value = conflict as NameRequestConflict
      }
  }
  // computed<Array<ConflictList>> 
  const parsedCOBRSConflicts = computed <Array<ConflictList>>([])
  /*
  function parsedSynonymConflicts() { 
  	//output.push( { count: 0, highlightedText: 'Exact Word Order + Synonym Match', class: 'conflict-heading' } )
      if ( ConflictList.length > 0 ) {
          //output.push( ...ConflictList )
          parsedSynonymConflicts = ConflictList
      } else {
          //output.push( { highlightedText: 'No Match', class: 'conflict-no-match' } )
          parsedSynonymConflicts = null
      }
  }   
  */
  
  const parsedCOBRSConflicts = computed <Array<ConflictList>>([])
  /*
  function parsedCOBRSConflicts() {
      // output.push( { count: 0, highlightedText: 'Character Swap Match', class: 'conflict-heading' } )
      if ( ConflictList.length > 0 ) {
          //output.push( ...state.parsedCOBRSConflicts )
          parsedCOBRSConflicts = ConflictList
      } else {
          //output.push( { highlightedText: 'No Match', class: 'conflict-no-match' } )
          parsedCOBRSConflicts = null
      }
  }
  */

  const parsedPhoneticConflicts = computed <Array<ConflictList>>([])
  /*
  function parsedPhoneticConflicts = ref<Array<ConflictList>>(
      // output.push( { count: 0, highlightedText: 'Phonetic Match (experimental)', class: 'conflict-heading' } )
      if ( ConflictList.length > 0 ) {
          //output.push( ...state.parsedPhoneticConflicts )
          parsedPhoneticConflicts = ConflictList
      } else {
          //output.push( { highlightedText: 'No Match', class: 'conflict-no-match' } )
          parsedPhoneticConflicts = null         
      } 
  )
  */
  const decisionFunctionalityDisabled = computed <boolean> (
    () =>    
      
  )
  const conflictsAutoAdd = ref(0)
   
  const autoAddDisabled = computed (
    () =>
      decisionFunctionalityDisabled.value ||
      selectedConflicts.value.length > 0 ||
      comparedConflicts.value.length > 0
  ) 
  
  ///const comments = ref<Array<Comment>>(mock.comments)  
  const comments = computed <Array<Comment>> (() => {
      return state.Comment
  })
   
  ///const conflicts = ref<Array<Conflict>>()
  const conflicts = computed <Array<Conflict>> (() => {   
        return state.Conflict
  })
  
  const corpConflictJSON = ref<CorpConflict>()
  const namesConflictJSON = ref<NameRequestConflict>()
  
  //cwu//  selectedConflicts: state => state.selectedConflicts
  const selectedConflicts = ref<Array<ConflictListItem>>([])
  
  //cwu//  comparedConflicts: state => state.comparedConflicts
  const comparedConflicts = ref<Array<Conflict>>([])

  const listDecisionReasons = computed(() => {
      return state.listDecisionReasons
  })
  
  const trademarksJSON = computed(() => {
      return state.trademarksJSON
  })
  
  //  const nr_status = ref(Status.InProgress)
  const nr_status = computed(() => {
      return state.additionalCompInfo.nr_status
  })

  const is_editing = ref(false)
  const is_making_decision = ref(true)
  const is_header_shown = ref(false)
  const nrNumber = ref()
  const isClosed = computed(() =>
    [
      Status.Rejected,
      Status.Approved,
      Status.Conditional,
      Status.Consumed,
    ].includes(nr_status.value)
  )
  
  const previousStateCd = ref<Status>()  
  const listRequestTypes = ref<Array<RequestType>>(
    requestTypes as Array<RequestType>
  )
  
  const requestType = ref<RequestTypeCode>(RequestTypeCode.CP)
  //  const requestType = computed(() => {
  //    return state.compInfo.requestType
  //  }  
  
  const requestTypeObject = computed(
    () => listRequestTypes.value.find((r) => r.value == requestType.value)!
  )
  const requestTypeRules = ref<Array<RequestTypeRule>>(
    requestTypeRulesJSON as Array<RequestTypeRule>
  )

  // const requestActionCd = computed(() => {
  //    return state.compInfo.requestActionCd
  //  }  
  const requestActionCd = computed<RequestActionCode>(
    () => requestTypeObject.value.request_action_cd
  )
  
  //const entityTypeCd = computed(() => {
  //  return state.compInfo.entityTypeCd
  //}    
  const entityTypeCd = computed<EntityTypeCode>(
    () => requestTypeObject.value.entity_type_cd
  )

  const conditionsJSON = ref({
    restricted_words_conditions: [
      { cnd_info: [{ allow_use: 'N', consent_required: '' }] },
    ],
  })  

  const parseConditions = computed(() => {
    function parseBoolean(cond) {
      if ( cond === 'Y' ) return true
      if ( cond === 'N' ) return false
      return ''
    }
 
    if ( state.conditionsJSON && state.conditionsJSON.restricted_words_conditions ) {
      let output = []
      for ( let restrictedWord of state.conditionsJSON.restricted_words_conditions ) {
        for ( let conditionInfo of restrictedWord.cnd_info ) {
          let object = {
            ...conditionInfo,
            consent_required_tf: parseBoolean( conditionInfo.consent_required ),
            allow_use_tf: parseBoolean( conditionInfo.allow_use ),
            phrase: restrictedWord.word_info.phrase,
          }
          output.push( object )
        }
      }
      return output
    }
    return []
  }  

  const trademarkInfo = ref({ names: [] })

  const historiesJSON = ref<History>()  

  const historiesInfoJSON = ref<NameRequestConflict>()
   
  const consentRequiredByUser = ref(false)

  //cwu//  selectedConditions: state => state.selectedConditions
  const selectedConditions = ref<Array<Condition>>([])

  //cwu// customerMessageOverride: state => state.customerMessageOverride
  const customerMessageOverride = ref<string>()

  const decisionSelectionsDisabled = computed(
    () => customerMessageOverride.value != null
  )

  const selectedMacros = ref<Array<Macro>>([])

  //cwu//   selectedTrademarks: state => state.selectedTrademarks,
  const selectedTrademarks = ref<Array<Trademark>>([])

  const conditionMessages = computed(() =>
    selectedConditions.value.map((condition) =>
      condition.phrase !== undefined && condition.phrase !== ''
        ? `${condition.phrase} - ${condition.instructions}`
        : condition.instructions
    )
  )

  const conflictMessages = computed(() => {
    if (selectedConflicts.value.length === 0 && consentRequiredByUser.value) {
      return ['Consent Required \n']
    } else {
      return selectedConflicts.value.map((conflict) =>
        consentRequiredByUser.value
          ? `Consent required from ${conflict.text}`
          : `Rejected due to conflict with ${conflict.text}`
      )
    }
  })

  const trademarkMessages = computed(() =>
    selectedTrademarks.value.map(
      (trademark) =>
        `Registered Trademark: ${trademark.name} - Application #${trademark.application_number}`
    )
  )

  const macroMessages = computed(() =>
    selectedMacros.value.map((macro) => macro.reason)
  )

  const requestorMessageStrings = computed(() =>
    conflictMessages.value.concat(
      conditionMessages.value,
      trademarkMessages.value,
      macroMessages.value
    )
  )

  const requestorMessage = computed(() => {
    if (customerMessageOverride.value) {
      return customerMessageOverride.value
    } else {
      return requestorMessageStrings.value.join('\n\n')
    }
  })

  //const acceptanceWillBeConditional = computed(
  //  () => consentRequiredByUser.value
  //)

  const acceptanceWillBeConditional: state => {
    const noConsentRequiredConditions = ['PERSONAL REAL ESTATE CORPORATION', 'PERSONAL REAL ESTATE', 'PERSONAL REAL']
    let checkConditions = () => {
      if (state.selectedConditions && Array.isArray(state.selectedConditions) ) {
        return (state.selectedConditions.some(condition => condition.consent_required) && !(noConsentRequiredConditions.includes(state.selectedConditions[0].phrase)))
      }
      return false
    }
    return state.consentRequiredByUser || checkConditions() || false
  }

  const decision_made = ref<Status>()

  const compName1 = reactive<NameChoice>(mock.compName1 as NameChoice)
  const compName2 = reactive<NameChoice>(mock.compName2 as NameChoice)
  const compName3 = reactive<NameChoice>(mock.compName3 as NameChoice)
  const nameChoices = computed(() => [compName1, compName2, compName3])

  const currentNameObj = ref()
  const currentName = computed(() => currentNameObj.value.name)
  const currentChoice = computed(() => currentNameObj.value.choice)

  ///const userHasApproverRole = ref(true)
  function userHasApproverRole = computed(() => {
    let roles = state.user_roles
    return roles.includes( 'names_approver' )
  })
 
  ///const userHasEditRole = ref(true)
  function userHasEditRole = computed(() => {
      let roles = state.user_roles
      return roles.includes( 'names_approver' ) || roles.includes( 'names_editor' )
  }) 
  
  ///const is_my_current_nr = computed(
  //  () =>
  //    nr_status.value === Status.InProgress && userId.value === examiner.value
  //)
  function is_my_current_nr = computed(() => {
      // set flag indicating whether you own this NR and it's in progress
      if ( state.currentState == 'INPROGRESS' && state.examiner == state.userId ) {
        return true
      }
      else {
        return false
      }
  })
  
  const furnished = ref<'Y' | 'N'>('N')

  const listJurisdictions = ref<Array<Jurisdiction>>(jurisdictionsData)
  
  ///const jurisdiction = computed(() => {
  //    return state.additionalCompInfo.jurisdiction
  //}
  const jurisdiction = ref<string>()
  
  ///const jurisdictionNumber = computed(() => {
  //    return state.nrData.homeJurisNum
  //}
  const jurisdictionNumber = ref<string>()
  
  const jurisdictionRequired = ref(false)

  const previousNr = ref<string>()
  const prevNrRequired = ref(false)

  ///const consumptionDate = ref<string>()
  function consumptionDate = computed(() => {
    /* Find the consumption date for the request from the individual name consumption date.
     */
    var thedate = null
    if ( state.compInfo.compNames.compName1.consumptionDate != null ) {
      thedate = state.compInfo.compNames.compName1.consumptionDate
    }
    else if ( state.compInfo.compNames.compName2.consumptionDate != null ) {
      thedate = state.compInfo.compNames.compName2.consumptionDate
    }
    else {
      thedate = state.compInfo.compNames.compName3.consumptionDate
    }

    if ( thedate != null ) {
      return thedate
    }
    return null
  })
  
  ///const consumedBy = ref<string>()  
  function consumedBy = computed(() => {
    let consumedBy = ''
    // Note: consumptionDate checks were added as NRs from Society include corpNum even when the NR hasn't been
    // consumed yet.  This was causing consumed by field to be populated and caused confusion for examiners.
    if ( state.compInfo.compNames.compName1.corpNum != null &&
         !!state.compInfo.compNames.compName1.consumptionDate) {
      consumedBy = state.compInfo.compNames.compName1.corpNum
    }
    else if ( state.compInfo.compNames.compName2.corpNum != null &&
              !!state.compInfo.compNames.compName2.consumptionDate) {
      consumedBy = state.compInfo.compNames.compName2.corpNum
    }
    else {
      if ( !!state.compInfo.compNames.compName3.consumptionDate ) {
        consumedBy = state.compInfo.compNames.compName3.corpNum
      }
    }
    return consumedBy
  })
   
  const consentDateForEdit = ref<string>()
  
  const consentFlag = ref<ConsentFlag>()

  const pendingTransactionRequest = ref(false)
  
  const transactionsData = ref<Array<Transaction>>()

  ///const refundPaymentState = ref<RefundState>()  
  refundPaymentState(state, getters) {
    console.log('getters paymentsData' + state.paymentsData)
    if (state.paymentsData && state.paymentsData.length > 0) {
      if (state.paymentsData.length == 1) {
        return getters.refundState
      }else {
        // More than 1 payment. (e.g. paid priority service)
        if (!getters.isDifferentPaymentStatus) {
          // all payments have the same status
          return getters.refundState
        } else {
          // the payments have the different status (.e.g one REFUNDED and another one REFUND_REQUESTED)
          if (!getters.isNoRefund) {
            // Multi-transaction scenario returns success
            return 'Refund Request Processed'
          } else {
            // This should not happen
            return 'Refund Not Processed'
          }
        }
      }

      return state.paymentsData[0].sbcPayment.statusCode
    }

    return null
  }  

  ///const submittedDate = ref('2008-09-16, 4:44pm')
  const submittedDate = computed(() => {
    if ( state.submittedDate ) return state.submittedDate
    return null
  }
    
  const corpNum = ref<string>()
  const corpNumRequired = ref(false)
  
  ///const expiryDate = ref<string>()
  const expiryDate = computed(() => {
    if ( state.expiryDate ) {
      return state.expiryDate
    }
    return null
  } 
  
 ////*** These value get filled by the loadCompanyInfo function


  const additionalInfo = ref(additionalInfo)
  const additional_info_template = ref<string>()
  const natureOfBusiness = ref(mock.natureOfBusiness)
  const clientFirstName = ref(mock.clientFirstName)
  const clientLastName = ref(mock.clientLastName)
  const firstName = ref(mock.firstName)
  const middleName = ref(mock.middleName)
  const lastName = ref(mock.lastName)
  const addressLine1 = ref(mock.addressLine1)
  const addressLine2 = ref(mock.addressLine2)
  const addressLine3 = ref(mock.addressLine3)
  const city = ref(mock.city)
  const province = ref(mock.province)
  const postalCode = ref(mock.postalCode)
  const country = ref(mock.country)
  const phone = ref(mock.phone)
  const fax = ref(mock.fax)
  const conEmail = ref(mock.conEmail)
  const contactName = ref(mock.contactName)
  
 ////*** 
  
  const forceConditional = ref(false)

  const hasBeenReset = ref(false)

  const additionalInfoTransformedTemplate = computed(() => {
    return additional_info_template.value
      ?.split('||')
      .map((template) =>
        template
          .replaceAll('<corp_num>', corpNum.value || '')
          .replaceAll('<prev_nr>', previousNr.value || '')
      )
      .join(' ')
  })

  const canEdit = computed(() => {
    if (consumptionDate.value) return false
    if (is_my_current_nr.value) return true
    return (
      userHasEditRole.value &&
      [
        Status.Draft,
        Status.Hold,
        Status.Rejected,
        Status.Approved,
        Status.Conditional,
      ].includes(nr_status.value)
    )
  })

  const otherExaminerInProgress = computed(
    () =>
      userId.value !== examiner.value && nr_status.value === Status.InProgress
  )

  const expired = computed(
    () =>
      expiryDate.value &&
      DateTime.fromISO(expiryDate.value).endOf('day') < DateTime.now()
  )

  const isApprovedAndExpired = computed(
    // NR will move to 'EXPIRED' state once expiry date is reached for 'APPROVED', 'CONDITIONAL' state.
    // If currentState is 'EXPIRED', then it was approved and expired.
    () => expiryDate.value && nr_status.value === Status.Expired
  )

  const canCancel = computed(
    () =>
      userHasEditRole.value &&
      !otherExaminerInProgress.value &&
      !expired.value &&
      !is_making_decision.value &&
      nr_status.value !== Status.Cancelled &&
      !isApprovedAndExpired.value
  )

  /** Can the current user claim the current name request for examination? */
  const canClaim = computed(
    () =>
      userHasApproverRole.value &&
      [Status.Draft, Status.Hold].includes(nr_status.value)
  )

  interface EditAction {
    /** Return whether an edit action's internal state is valid (e.g. a name field is not empty).
     * This function is called before saving. A save will not occur if at least one edit action's validation fails.
     */
    validate: (() => boolean) | (() => Promise<boolean>)
    /** Update the store's value with the new values. This function is called after all validations have succeeded */
    update: () => void
    /** Called when the user cancels an edit. */
    cancel: () => void
  }
  const editActions: Array<EditAction> = []
  function addEditAction(action: EditAction) {
    editActions.push(action)
  }

  async function getHistoryInfo(nrNumber: string) {
    historiesInfoJSON.value = conflicts.value[1] as NameRequestConflict
  }

  async function getConflictInfo(item: ConflictListItem) {
    corpConflictJSON.value = undefined
    namesConflictJSON.value = undefined
    const conflict = conflicts.value.filter(
      (conflict) => conflict.nrNumber === item.nrNumber
    )[0]
    if (item.source === 'CORP') {
      corpConflictJSON.value = conflict as CorpConflict
    } else {
      namesConflictJSON.value = conflict as NameRequestConflict
    }
  }

  function toggleConflictCheckbox(conflictItem: ConflictListItem) {
    const selectedNRs = comparedConflicts.value.map((c) => c.nrNumber)
    if (selectedNRs.includes(conflictItem.nrNumber)) {
      selectedConflicts.value = selectedConflicts.value.filter(
        (c) => c.nrNumber !== conflictItem.nrNumber
      )
      comparedConflicts.value = comparedConflicts.value.filter(
        (c) => c.nrNumber !== conflictItem.nrNumber
      )
    } else {
      const conflict = mock.conflicts.filter(
        (c) => c.nrNumber === conflictItem.nrNumber
      )[0]
      comparedConflicts.value.push(conflict as Conflict)
      if (conflictsAutoAdd.value) {
        selectedConflicts.value.push(conflictItem)
      }
    }
  }

  ///function getShortJurisdiction(jurisdiction: string) {
  //  return jurisdiction
  //}
  function getShortJurisdiction: state => jurisdiction => {
    jurisdiction = jurisdiction.toUpperCase()
    if ( jurisdiction.length === 2 ) return jurisdiction

    let index
    let textIndex = state.listJurisdictions.findIndex(opt => opt.text === jurisdiction)
    if ( textIndex >= 0 ) index = textIndex
    let shortIndex = state.listJurisdictions.findIndex(opt => opt.SHORT_DESC === jurisdiction)
    if ( shortIndex >= 0 ) index = shortIndex

    if ( typeof index === 'number' ) {
      return state.listJurisdictions[index].value
    }

    return '?'
  }
  

  function setConsentFlag(flag: ConsentFlag | undefined) {
    consentFlag.value = flag
    if (flag === ConsentFlag.Received) {
    }
  }

  function isUndoable(name: NameChoice): boolean {
    if (
      !userHasApproverRole.value || // if the NR is closed in any way, a name is not undoable - the NR will have to be re-opened first
      !is_my_current_nr.value ||
      furnished.value === 'Y' || // if the NR is furnished, nothing is undoable
      name.state == Status.NotExamined || // if this name is complete (ie: anything other than NE) it's undoable
      name.state == null
    ) {
      return false
    }

    if (name.choice === 1) {
      // if name choices 2 and 3 have not been decided, then 1 is undoable
      return (
        (compName2.state == Status.NotExamined || compName2.state == null) &&
        (compName3.state == Status.NotExamined || compName3.state == null)
      )
    } else if (name.choice === 2) {
      // if name choice 3 has not been decided, then 2 is undoable
      return compName3.state == Status.NotExamined || compName3.state == null
    } else {
      return true
    }
  }

  function undoNameChoiceDecision(name: NameChoice) {
    resetExaminationArea()
    if (name.choice == 1) {
      currentNameObj.value = compName1
    } else if (name.choice == 2) {
      currentNameObj.value = compName2
    } else {
      currentNameObj.value = compName3
    }
    currentNameObj.value.state = Status.NotExamined
    currentNameObj.value.conflict1 = null
    currentNameObj.value.conflict2 = null
    currentNameObj.value.conflict3 = null
    currentNameObj.value.conflict1_num = null
    currentNameObj.value.conflict2_num = null
    currentNameObj.value.conflict3_num = null
    currentNameObj.value.decision_text = null
    currentNameObj.value.comment = null
  }

  async function makeDecision(decision: Status) {
    decision_made.value = decision
    if (decision_made.value === Status.Approved) {
      if (acceptanceWillBeConditional.value || forceConditional.value) {
        currentNameObj.value.state = Status.Condition
        forceConditional.value = false
      } else {
        currentNameObj.value.state = Status.Approved
        // If there were conflicts selected but this is an approval, remove the selected conflicts.
        // Do NOT clear the conflicts if the "Consent Required" condition is also set - then it's intentional.
        selectedConflicts.value = []
      }
    } else {
      currentNameObj.value.state = Status.Rejected
    }

    if (selectedConflicts.value.length > 0) {
      // Populate the current name object's conflicts
      for (const n of [0, 1, 2]) {
        const conflict = selectedConflicts.value[n]
        if (conflict == null) break

        switch (n) {
          case 0:
            currentNameObj.value.conflict1 = conflict.text
            currentNameObj.value.conflict1_num = conflict.nrNumber
            break
          case 1:
            currentNameObj.value.conflict2 = conflict.text
            currentNameObj.value.conflict2_num = conflict.nrNumber
            break
          case 2:
            currentNameObj.value.conflict3 = conflict.text
            currentNameObj.value.conflict3_num = conflict.nrNumber
            break
        }
      }
    }
    currentNameObj.value.name = currentNameObj.value.name.trimEnd()
    currentNameObj.value.decision_text = requestorMessage.value.substring(
      0,
      955
    )
    await pushAcceptReject()

    if (currentNameObj.value.state === Status.Approved) {
      await updateNRState(Status.Approved)
    } else if (currentNameObj.value.state === Status.Condition) {
      await updateNRState(Status.Conditional)
    } else {
      await examineNextNameChoice()
    }
    decision_made.value = undefined
  }

  async function makeQuickDecision(decision: Status, decisionText: string) {
    currentNameObj.value.decision_text = decisionText
    decision_made.value = decision
    if (decision_made.value === Status.Approved) {
      currentNameObj.value.state = Status.Approved
    } else {
      currentNameObj.value.state = Status.Rejected
    }
    await pushAcceptReject()
    decision_made.value = undefined
  }

  /** Attempt to set the given name choice as the current one. Will throw an error if the choice cannot be examined. */
  async function setCurrentNameChoice(choice: NameChoice) {
    if (!choice.state || choice.state !== 'NE') {
      throw new Error(`Name choice ${choice.choice} cannot be examined`)
    } else {
      currentNameObj.value = choice
    }
  }

  /** Attempts to examine the next name choice in the name request. */
  async function examineNextNameChoice() {
    const attempt = async (choice: NameChoice) => {
      try {
        await setCurrentNameChoice(choice)
      } catch (e) {
        await updateNRState(Status.Rejected)
      }
    }
    if (currentChoice.value === 1) {
      await attempt(compName2)
    } else if (currentChoice.value === 2) {
      await attempt(compName3)
    } else {
      await updateNRState(Status.Rejected)
    }
  }

  /** Attempt to set the given name choice as the current one. Will throw an error if the choice cannot be examined. */
  async function setCurrentNameChoice(choice: NameChoice) {
    if (!choice.state || choice.state !== 'NE') {
      throw new Error(`Name choice ${choice.choice} cannot be examined`)
    } else {
      currentNameObj.value = choice
    }
  }

  /** Attempts to examine the next name choice in the name request. */
  async function examineNextNameChoice() {
    const attempt = async (choice: NameChoice) => {
      try {
        await setCurrentNameChoice(choice)
      } catch (e) {
        await updateNRState(Status.Rejected)
      }
    }
    if (currentChoice.value === 1) {
      await attempt(compName2)
    } else if (currentChoice.value === 2) {
      await attempt(compName3)
    } else {
      await updateNRState(Status.Rejected)
    }
  }

  /** Send name request decision to API */
  async function pushAcceptReject() {
    //  /// TODO: make a PUT call to api
  }

  function runManualRecipe(searchStr: string, exactPhrase: string) {}

  function resetExaminationArea() {}

  async function getpostgrescompInfo(nrNumber: string) {
    console.log(`getting ${nrNumber}`)
  }

  async function updateNRStatePreviousState(
    nrState: Status,
    previousState: Status
  ) {
    const patch = { previousStateCd: previousState, state: nrState }
    await patchNameRequest(nrNumber.value, patch)

    await getpostgrescompInfo(nrNumber.value)
    await setNewExaminer()
  }

  async function getTransactionsHistory(nrNumber: string) {
    pendingTransactionRequest.value = true
    try {
      const transactions = await getTransactions(nrNumber)
      transactions.forEach((t) => sortNameChoices(t.names))
      transactionsData.value = transactions
    } catch (error) {
      console.error(`Error while retrieving transactions: ${error}`)
      transactionsData.value = undefined
    } finally {
      pendingTransactionRequest.value = false
    }
  }

  async function setNewExaminer() {
    if (examiner.value.includes('account')) {
      await getTransactionsHistory(nrNumber.value)
      if (transactionsData.value == null) {
        return
      }

      for (const transaction of transactionsData.value) {
        if (
          transaction.user_name.split('@').at(1)?.includes('idir') &&
          transaction.user_action.includes('Decision')
        ) {
          examiner.value = transaction.user_name
          break
        }
      }
    }
  }

  async function updateNRState(state: Status) {
    nr_status.value = state
  }

  async function revertToPreviousState() {
    await patchNameRequest(nrNumber.value, {
      state: previousStateCd.value,
      previousStateCd: null,
    })
    await getpostgrescompInfo(nrNumber.value)
    await setNewExaminer()
  }

  async function updateRequest() {
    ///todo
    console.log('updating request')
  }
  
  /** Runs all edit actions, ensuring all actions have valid internal state before updating the store state.
   * @returns whether all the actions ran successfully
   */
  async function runEditActions(): Promise<boolean> {
    for (const action of editActions) {
      if (!(await action.validate())) {
        return false
      }
    }
    editActions.forEach((ea) => ea.update())
    return true
  }

  async function saveEdits() {
    if (!(await runEditActions())) {
      return
    }

    if (previousStateCd.value === Status.Draft) {
      nr_status.value = previousStateCd.value
      previousStateCd.value = undefined
    }

    await updateRequest()

    is_editing.value = false
    is_header_shown.value = true
  }

  function updateRequestTypeRules(requestType: RequestType) {
    let rules = requestTypeRules.value.find(
      (rule) => rule.request_type == requestType.value
    )
    prevNrRequired.value = Boolean(rules?.prev_nr_required)
    corpNumRequired.value = Boolean(rules?.corp_num_required)
    additional_info_template.value = rules?.additional_info_template
    jurisdictionRequired.value = Boolean(rules?.jurisdiction_required)
  }

  async function getpostgrescompNo() {
    /// todo
  }

  // TODO: should this be the $reset method for this store?
  async function resetValues() {
    ///todo
  }

  function resetConflictList() {}

  async function getNextCompany() {
    await resetValues()
    await getpostgrescompNo()
    resetConflictList()
  }

  ///  editMessageModalVisible: state => state.editMessageModalVisible
  async function edit() {
    // if this isn't the user's INPROGRESS, make it that
    if (!is_my_current_nr.value && !isClosed.value) {
      // track the previous state if it's currently in DRAFT (otherwise do not)
      if (nr_status.value == Status.Draft) {
        await updateNRStatePreviousState(Status.InProgress, Status.Draft)
      } else {
        await updateNRState(Status.InProgress)
      }
    }
    is_editing.value = true
  }

  async function holdRequest() {
    is_making_decision.value = false
    await updateNRState(Status.Hold)
    resetConflictList()
  }

  function clearSelectedDecisionReasons() {
    selectedConditions.value = []
    selectedConflicts.value = []
    selectedMacros.value = []
    selectedTrademarks.value = []
  }

  function clearConsent() {
    consentDateForEdit.value = undefined
    consentFlag.value = undefined
  }

  function resetNrDecision() {
    resetConflictList()
    clearSelectedDecisionReasons()

    nr_status.value = Status.InProgress
    if (!userHasApproverRole.value) {
      // initialize user in edit mode, with previous state set so NR gets set back to draft
      // when user is done changing name, adding comment, etc.
      previousStateCd.value = Status.Draft
      is_editing.value = true
    }
  }

  async function reOpen() {
    resetNrDecision()
    // set reset flag so name data is managed between Namex and NRO correctly
    hasBeenReset.value = true
    await updateRequest()
  }

  async function resetNr() {
    resetNrDecision()
    clearConsent()
    furnished.value = 'N'
    await updateRequest()
  }

  async function claimNr() {
    await updateNRState(Status.InProgress)
    is_making_decision.value = true
  }

  async function postComment(text: string) {
    // TODO: post to comments endpoint and add api response to internalComments
    internalComments.value.push({
      comment: text,
      examiner: examiner.value,
      timestamp: DateTime.now().toISO(),
    })
  }

  async function cancelNr(commentText: string) {
    await postComment(commentText)
    is_making_decision.value = false
    nr_status.value = Status.Cancelled
    // TODO: push CANCELLED state to API
  }

  watch(
    () => [selectedConflicts],
    (_state) => {
      // compared conflicts should be kept the same as selected conflicts when auto add is enabled
      if (conflictsAutoAdd.value) {
        const selectedNRs = selectedConflicts.value.map((c) => c.nrNumber)
        comparedConflicts.value = comparedConflicts.value.filter((c) =>
          selectedNRs.includes(c.nrNumber)
        )
      }
    },
    { deep: true }
  )

  watch(
    () => [nrNumber],
    async (_state) => {
      await getpostgrescompInfo(nrNumber.value)
      await setNewExaminer()
      updateRequestTypeRules(requestTypeObject.value)
    },
    { deep: true }
  )

 return {
    priority,
    is_complete,
    conflictsAutoAdd,
    conflicts,
    comments,
    examiner,
    trademarksJSON,
    selectedConflicts,
    internalComments,
    isClosed,
    is_editing,
    is_making_decision,
    is_header_shown,
    nrNumber,
    nr_status,
    previousStateCd,
    listRequestTypes,
    requestType,
    requestTypeObject,
    requestTypeRules,
    requestActionCd,
    entityTypeCd,
    parsedCOBRSConflicts,
    exactMatchesConflicts,
    parsedSynonymConflicts,
    parsedPhoneticConflicts,
    corpConflictJSON,
    namesConflictJSON,
    conditionsJSON,
    trademarkInfo,
    historiesJSON,
    autoAddDisabled,
    decisionFunctionalityDisabled,
    parseConditions,
    comparedConflicts,
    historiesInfoJSON,
    consentRequiredByUser,
    selectedConditions,
    customerMessageOverride,
    decisionSelectionsDisabled,
    listDecisionReasons,
    selectedMacros,
    selectedTrademarks,
    requestorMessageStrings,
    requestorMessage,
    acceptanceWillBeConditional,
    decision_made,
    compName1,
    compName2,
    compName3,
    nameChoices,
    currentNameObj,
    currentChoice,
    currentName,
    userHasApproverRole,
    userHasEditRole,
    is_my_current_nr,
    furnished,
    forceConditional,
    listJurisdictions,
    previousNr,
    prevNrRequired,
    jurisdiction,
    jurisdictionRequired,
    jurisdictionNumber,
    consumptionDate,
    consumedBy,
    transactionsData,
    expiryDate,
    refundPaymentState,
    submittedDate,
    corpNum,
    corpNumRequired,
    consentDateForEdit,
    consentFlag,
    additionalInfo,
    additionalInfoTransformedTemplate,
    additional_info_template,
    natureOfBusiness,
    clientFirstName,
    clientLastName,
    firstName,
    middleName,
    lastName,
    addressLine1,
    addressLine2,
    addressLine3,
    city,
    province,
    postalCode,
    country,
    phone,
    fax,
    conEmail,
    contactName,
    canEdit,
    expired,
    isApprovedAndExpired,
    canCancel,
    canClaim,
    addEditAction,
    isUndoable,
    getHistoryInfo,
    getConflictInfo,
    toggleConflictCheckbox,
    getShortJurisdiction,
    setConsentFlag,
    makeDecision,
    undoNameChoiceDecision,
    makeQuickDecision,
    runManualRecipe,
    resetExaminationArea,
    getpostgrescompInfo,
    setNewExaminer,
    updateNRState,
    updateNRStatePreviousState,
    revertToPreviousState,
    saveEdits,
    updateRequestTypeRules,
    getpostgrescompNo,
    resetValues,
    resetConflictList,
    getNextCompany,
    edit,
    holdRequest,
    reOpen,
    resetNr,
    claimNr,
    postComment,
    cancelNr,
  }
})  

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useExamineStore, import.meta.hot))
}




  
