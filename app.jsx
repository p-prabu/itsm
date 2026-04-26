const {useState,useEffect,useRef,useMemo,useCallback}=React;

// ── THEMES ───────────────────────────────────────────────────────────────────
const THEMES={
  light:{name:"Pearl Grid",bg:"rgba(245,250,255,0.68)",sidebar:"rgba(255,255,255,0.72)",card:"rgba(255,255,255,0.6)",cardBorder:"rgba(104,132,255,0.14)",
    text:"#10203c",textMuted:"#4b628c",textFaint:"#89a0c4",accent:"#356cff",accentText:"#ffffff",
    inputBg:"rgba(255,255,255,0.78)",inputBorder:"rgba(93,128,255,0.18)",hover:"rgba(74,116,255,0.08)",divider:"rgba(99,127,214,0.14)",
    badge:"rgba(228,239,255,0.72)",badgeText:"#3d5786",
    p1Bg:"rgba(255,89,123,0.14)",p1Text:"#bc1f49",p1Border:"rgba(255,89,123,0.24)",
    p2Bg:"rgba(255,176,90,0.14)",p2Text:"#b36211",p2Border:"rgba(255,176,90,0.24)",
    p3Bg:"rgba(255,220,115,0.18)",p3Text:"#936900",p3Border:"rgba(255,220,115,0.28)",
    p4Bg:"rgba(68,234,180,0.14)",p4Text:"#117c56",p4Border:"rgba(68,234,180,0.22)",
    stNew:"rgba(80,153,255,0.14)",stNewText:"#215db6",
    stOpen:"rgba(255,198,90,0.16)",stOpenText:"#996000",
    stProg:"rgba(132,114,255,0.16)",stProgText:"#5b3ecf",
    stHold:"rgba(139,155,182,0.14)",stHoldText:"#4d607f",
    stDone:"rgba(70,231,185,0.16)",stDoneText:"#0f7d61",
    stClosed:"rgba(205,214,229,0.24)",stClosedText:"#677891",
    dpBg:"rgba(255,255,255,0.88)",dpText:"#10203c",dpMuted:"#89a0c4"},
  dark:{name:"Midnight Grid",bg:"rgba(7,10,23,0.88)",sidebar:"rgba(10,15,32,0.88)",card:"rgba(15,20,39,0.72)",cardBorder:"rgba(112,145,255,0.13)",
    text:"#edf4ff",textMuted:"#93a7ca",textFaint:"#60739b",accent:"#55e7ff",accentText:"#04121d",
    inputBg:"rgba(10,18,34,0.8)",inputBorder:"rgba(113,149,255,0.18)",hover:"rgba(86,127,255,0.08)",divider:"rgba(111,132,198,0.12)",
    badge:"rgba(17,25,46,0.88)",badgeText:"#9db0d3",
    p1Bg:"rgba(255,76,121,0.16)",p1Text:"#ff86ac",p1Border:"rgba(255,76,121,0.22)",
    p2Bg:"rgba(255,161,69,0.16)",p2Text:"#ffc07a",p2Border:"rgba(255,161,69,0.22)",
    p3Bg:"rgba(246,208,76,0.14)",p3Text:"#ffe48b",p3Border:"rgba(246,208,76,0.2)",
    p4Bg:"rgba(66,228,183,0.14)",p4Text:"#87f4d0",p4Border:"rgba(66,228,183,0.18)",
    stNew:"rgba(67,128,255,0.18)",stNewText:"#98baff",
    stOpen:"rgba(255,192,83,0.16)",stOpenText:"#ffd57d",
    stProg:"rgba(139,112,255,0.16)",stProgText:"#d2b9ff",
    stHold:"rgba(89,102,134,0.18)",stHoldText:"#b0bdd7",
    stDone:"rgba(61,222,176,0.16)",stDoneText:"#8ff7d7",
    stClosed:"rgba(46,55,83,0.22)",stClosedText:"#899ab7",
    dpBg:"rgba(12,18,36,0.95)",dpText:"#edf4ff",dpMuted:"#60739b"},
  softdark:{name:"Nova 2050",bg:"rgba(8,12,26,0.92)",sidebar:"rgba(12,18,36,0.88)",card:"rgba(17,24,44,0.68)",cardBorder:"rgba(107,151,255,0.16)",
    text:"#f3f7ff",textMuted:"#9bb0d3",textFaint:"#6176a0",accent:"#45f2db",accentText:"#051519",
    inputBg:"rgba(11,18,35,0.82)",inputBorder:"rgba(111,152,255,0.18)",hover:"rgba(84,122,255,0.1)",divider:"rgba(107,129,188,0.14)",
    badge:"rgba(14,22,40,0.92)",badgeText:"#a8b8d8",
    p1Bg:"rgba(255,71,126,0.18)",p1Text:"#ffa6c5",p1Border:"rgba(255,71,126,0.22)",
    p2Bg:"rgba(255,151,66,0.18)",p2Text:"#ffcb90",p2Border:"rgba(255,151,66,0.22)",
    p3Bg:"rgba(245,214,95,0.16)",p3Text:"#ffeca1",p3Border:"rgba(245,214,95,0.2)",
    p4Bg:"rgba(59,229,192,0.16)",p4Text:"#94ffe1",p4Border:"rgba(59,229,192,0.2)",
    stNew:"rgba(69,135,255,0.2)",stNewText:"#a7c8ff",
    stOpen:"rgba(255,188,83,0.18)",stOpenText:"#ffe08f",
    stProg:"rgba(137,99,255,0.18)",stProgText:"#dcc8ff",
    stHold:"rgba(75,88,122,0.2)",stHoldText:"#b5c1d8",
    stDone:"rgba(53,224,176,0.18)",stDoneText:"#9af9dc",
    stClosed:"rgba(41,49,74,0.22)",stClosedText:"#8c9dbc",
    dpBg:"rgba(12,18,36,0.96)",dpText:"#f3f7ff",dpMuted:"#6176a0"},
};

// ── CONSTANTS ────────────────────────────────────────────────────────────────
const STORAGE_KEY="itsm-register-v3";
const LEGACY_STORAGE_KEYS=["itsm-register-v3","itsm-register-v2","itsm-register-v1"];
const PRIORITY_MATRIX={
  "High|High":"P1","High|Medium":"P1","High|Low":"P2",
  "Medium|High":"P2","Medium|Medium":"P2","Medium|Low":"P3",
  "Low|High":"P3","Low|Medium":"P3","Low|Low":"P4",
};
const PRIORITIES=["P1","P2","P3","P4"];
const IMPACT_LEVELS=["High","Medium","Low"];
const URGENCY_LEVELS=["High","Medium","Low"];
const DEFAULT_SERVICES=["Email","VPN","SharePoint","Teams","Active Directory","Internet","Printers","CRM","ERP","Laptop / Desktop","Mobile Device","Other"];
const DEFAULT_ASSIGNMENT_GROUPS=["Help Desk L1","Help Desk L2","Network Team","Messaging Team","Security Team","IT Procurement","Facilities"];
const DEFAULT_OPERATOR="Help Desk L1";
const DEFAULT_SLA_POLICY={
  P1:{responseHours:1,resolutionHours:4},
  P2:{responseHours:4,resolutionHours:8},
  P3:{responseHours:8,resolutionHours:24},
  P4:{responseHours:24,resolutionHours:72},
};
const BREACH_FILTERS=["All","On Track","Due Soon","Breached"];
const DEFAULT_PRESETS=["all","my_open","breached","unassigned","on_hold_aging"];

const TICKET_TYPES={
  incident:{
    key:"incident",arrayKey:"incidents",prefix:"INC",icon:"⚠",label:"Incident",plural:"Incidents",
    createLabel:"Raise Incident",subjectLabel:"Reporter",subjectField:"reporter",
    title:"Incident Register",subtitle:"Operational queue with SLA and ownership controls.",
    categoryLabel:"Category",categories:["Hardware","Software","Network","Access / Account","Security","Email","Performance","Data","Facilities","Other"],
    statuses:["New","Assigned","In Progress","On Hold","Resolved","Closed","Cancelled"],
    openStatuses:["New","Assigned","In Progress","On Hold"],
    terminalStatuses:["Resolved","Closed","Cancelled"],
    autoCloseField:"closedAt",milestoneField:"resolvedAt",milestoneStatus:"Resolved",milestoneLabel:"Resolved",
    noteField:"resolution",noteLabel:"Resolution",notePlaceholder:"How was it resolved?",
    extraFields:["reporter"],
    presets:DEFAULT_PRESETS,
    validate(record){
      if(["Resolved","Closed"].includes(record.status)&&!record.resolution.trim())return "Resolution is required before resolving or closing an incident.";
      return null;
    },
    confirm(record,original){
      if(record.status==="Cancelled"&&original.status!=="Cancelled")return "Mark this incident as Cancelled?";
      return null;
    },
  },
  request:{
    key:"request",arrayKey:"requests",prefix:"REQ",icon:"⊕",label:"Service Request",plural:"Service Requests",
    createLabel:"New Request",subjectLabel:"Requester",subjectField:"requester",
    title:"Service Request Register",subtitle:"Request queue with approvals, SLA targets, and audit history.",
    categoryLabel:"Category",categories:["Access Request","New Hardware","New Software","Software License","Information Request","Configuration Change","New Employee Setup","Other"],
    statuses:["New","Pending Approval","Approved","In Progress","On Hold","Fulfilled","Rejected","Closed"],
    openStatuses:["New","Pending Approval","Approved","In Progress","On Hold"],
    terminalStatuses:["Fulfilled","Closed","Rejected"],
    autoCloseField:"closedAt",milestoneField:"fulfilledAt",milestoneStatus:"Fulfilled",milestoneLabel:"Fulfilled",
    noteField:"fulfillmentNotes",noteLabel:"Fulfillment Notes",notePlaceholder:"How was the request fulfilled?",
    extraFields:["requester","approver","requestType"],
    presets:[...DEFAULT_PRESETS,"awaiting_approval"],
    validate(record){
      if(["Fulfilled","Closed"].includes(record.status)&&!record.fulfillmentNotes.trim())return "Fulfillment notes are required before fulfilling or closing a request.";
      return null;
    },
    confirm(record,original){
      if(record.status==="Rejected"&&original.status!=="Rejected")return "Mark this request as Rejected?";
      return null;
    },
  },
  problem:{
    key:"problem",arrayKey:"problems",prefix:"PRB",icon:"◈",label:"Problem",plural:"Problems",
    createLabel:"New Problem",subjectLabel:"Reporter",subjectField:"reporter",
    title:"Problem Register",subtitle:"Track root cause analysis, known errors, and permanent fixes.",
    categoryLabel:"Category",categories:["Application","Infrastructure","Network","Security","Data","Capacity","Access / Account","Supplier","Other"],
    statuses:["New","Under Investigation","Root Cause Identified","Known Error","On Hold","Resolved","Closed"],
    openStatuses:["New","Under Investigation","Root Cause Identified","Known Error","On Hold"],
    terminalStatuses:["Resolved","Closed"],
    autoCloseField:"closedAt",milestoneField:"resolvedAt",milestoneStatus:"Resolved",milestoneLabel:"Resolved",
    noteField:"resolution",noteLabel:"Resolution",notePlaceholder:"What permanent fix closed the problem?",
    extraFields:["reporter","rootCause","workaround","knownError"],
    presets:DEFAULT_PRESETS,
    validate(record){
      if(record.status==="Root Cause Identified"&&!record.rootCause.trim())return "Root cause is required before moving a problem to Root Cause Identified.";
      if(record.status==="Known Error"&&!record.workaround.trim()&&!record.knownError.trim())return "Workaround or known error details are required before marking a problem as Known Error.";
      if(["Resolved","Closed"].includes(record.status)&&!record.resolution.trim())return "Resolution is required before resolving or closing a problem.";
      return null;
    },
    confirm(){return null;},
  },
  change:{
    key:"change",arrayKey:"changes",prefix:"CHG",icon:"⟳",label:"Change Request",plural:"Changes",
    createLabel:"New Change",subjectLabel:"Requester",subjectField:"requester",
    title:"Change Register",subtitle:"Plan, approve, schedule, and review ITIL-lite changes.",
    categoryLabel:"Category",categories:["Infrastructure Change","Application Change","Network Change","Security Change","Access Change","Release / Deployment","Emergency Change","Other"],
    statuses:["Draft","Pending Approval","Approved","Scheduled","Implementation","Review","Completed","Rejected","Cancelled"],
    openStatuses:["Draft","Pending Approval","Approved","Scheduled","Implementation","Review"],
    terminalStatuses:["Completed","Rejected","Cancelled"],
    autoCloseField:"closedAt",milestoneField:"completedAt",milestoneStatus:"Completed",milestoneLabel:"Completed",
    noteField:"implementationSummary",noteLabel:"Implementation Summary",notePlaceholder:"What happened during implementation and review?",
    extraFields:["requester","approver","changeType","reason","implementationPlan","backoutPlan","testPlan"],
    presets:["all","my_open","awaiting_approval","scheduled","breached","unassigned"],
    validate(record){
      if(record.status==="Approved"&&!record.implementationPlan.trim())return "Implementation plan is required before approving a change.";
      if(["Scheduled","Implementation"].includes(record.status)&&!record.testPlan.trim())return "Test plan is required before scheduling or implementing a change.";
      if(record.status==="Completed"&&(!record.implementationPlan.trim()||!record.backoutPlan.trim()))return "Implementation plan and backout plan are required before completing a change.";
      return null;
    },
    confirm(record,original){
      if(record.status==="Rejected"&&original.status!=="Rejected")return "Mark this change as Rejected?";
      if(record.status==="Cancelled"&&original.status!=="Cancelled")return "Mark this change as Cancelled?";
      return null;
    },
  },
};

const ORDERED_TYPES=["incident","request","problem","change"];
const COUNTER_KEYS={incident:"incCounter",request:"reqCounter",problem:"prbCounter",change:"chgCounter"};
const PRESET_TITLES={
  all:"All Open",
  my_open:"My Open Tickets",
  breached:"Breached Tickets",
  unassigned:"Unassigned",
  awaiting_approval:"Awaiting Approval",
  on_hold_aging:"On Hold > 3 Days",
  scheduled:"Scheduled",
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const nowIso=()=>new Date().toISOString();
const todayStr=()=>new Date().toISOString().split("T")[0];
const padNum=(n,len=5)=>String(n).padStart(len,"0");
const calcPriority=(impact,urgency)=>PRIORITY_MATRIX[`${impact}|${urgency}`]||"P3";
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
const fmtDate=(d)=>{if(!d)return"—";const dt=new Date(d);return Number.isNaN(dt.getTime())?"—":dt.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});};
const fmtDateTime=(d)=>{if(!d)return"—";const dt=new Date(d);return Number.isNaN(dt.getTime())?"—":dt.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});};
const safeDate=(d)=>{const dt=new Date(d);return Number.isNaN(dt.getTime())?null:dt;};
const humanAge=(d)=>{const dt=safeDate(d);if(!dt)return"—";const hrs=(Date.now()-dt.getTime())/36e5;return hrs<24?`${Math.max(0,Math.round(hrs))}h`:`${Math.max(0,Math.round(hrs/24))}d`;};
const toDateTimeLocal=(iso)=>{const dt=safeDate(iso);if(!dt)return"";const local=new Date(dt.getTime()-dt.getTimezoneOffset()*60000);return local.toISOString().slice(0,16);};
const fromDateTimeLocal=(value)=>value?new Date(value).toISOString():"";
const addHoursIso=(baseIso,hours)=>{const dt=safeDate(baseIso)||new Date();return new Date(dt.getTime()+Number(hours||0)*36e5).toISOString();};
const nextTicketCounter=(records,prefix)=>records.reduce((highest,r)=>{const match=typeof r.ticketNo==="string"&&r.ticketNo.match(new RegExp(`^${prefix}(\\d+)$`));return match?Math.max(highest,Number(match[1])):highest;},0)+1;
const getTypeConfig=(type)=>TICKET_TYPES[type]||TICKET_TYPES.incident;
const getActor=(rec,settings)=>rec.assignee||rec.assignmentGroup||settings.operatorName||"System";
const makeActivity=(action,note,meta={})=>({id:newId(),at:nowIso(),action,note,meta});
const copyFilters=(filters)=>JSON.parse(JSON.stringify(filters));
const isMeaningfulChange=(a,b)=>(a||"")!==(b||"");
const ensureArray=(v)=>Array.isArray(v)?v:[];
const sanitizeLinks=(links)=>[...new Set(ensureArray(links).map(x=>String(x||"").trim().toUpperCase()).filter(Boolean))];
const getSlaTargets=(priority,settings,createdAt)=>{const policy=(settings.slaPolicy||DEFAULT_SLA_POLICY)[priority]||DEFAULT_SLA_POLICY.P3;return{responseDueAt:addHoursIso(createdAt||nowIso(),policy.responseHours),resolutionDueAt:addHoursIso(createdAt||nowIso(),policy.resolutionHours)};};
const ensureEvidence=(evidence)=>Array.isArray(evidence)?evidence.filter(Boolean).map(item=>({id:item.id||newId(),label:item.label||item.reference||item.url||"Reference",url:item.url||"",reference:item.reference||item.label||""})):[];
const ensureActivityLog=(log)=>Array.isArray(log)?log.filter(Boolean).map(item=>({id:item.id||newId(),at:item.at||nowIso(),action:item.action||"update",note:item.note||"",meta:item.meta||{}})):[];
const ensureWorkNotes=(notes)=>Array.isArray(notes)?notes.filter(Boolean).map(item=>({at:item.at||nowIso(),by:item.by||"System",note:item.note||""})):[];
const isOpenRecord=(r)=>getTypeConfig(r.type).openStatuses.includes(r.status);
const isTerminalRecord=(r)=>getTypeConfig(r.type).terminalStatuses.includes(r.status);
const getStatusTone=(s)=>({New:"new",Assigned:"new","Pending Approval":"open",Approved:"prog","In Progress":"prog","Under Investigation":"prog","Root Cause Identified":"prog","Known Error":"hold","On Hold":"hold",Scheduled:"open",Implementation:"prog",Review:"prog",Resolved:"done",Fulfilled:"done",Completed:"done",Closed:"closed",Cancelled:"closed",Rejected:"closed",Draft:"new"})[s]||"new";
const mapStatusColors=(theme,s)=>{
  const tone=getStatusTone(s);
  if(tone==="new")return [theme.stNew,theme.stNewText];
  if(tone==="open")return [theme.stOpen,theme.stOpenText];
  if(tone==="prog")return [theme.stProg,theme.stProgText];
  if(tone==="hold")return [theme.stHold,theme.stHoldText];
  if(tone==="done")return [theme.stDone,theme.stDoneText];
  return [theme.stClosed,theme.stClosedText];
};
const getTerminalField=(type)=>getTypeConfig(type).autoCloseField;
const getMilestoneField=(type)=>getTypeConfig(type).milestoneField;
const getMilestoneStatus=(type)=>getTypeConfig(type).milestoneStatus;
const normalizeSettings=(settings={})=>{
  const merged={theme:"softdark",services:DEFAULT_SERVICES,assignmentGroups:DEFAULT_ASSIGNMENT_GROUPS,operatorName:DEFAULT_OPERATOR,incCounter:1,reqCounter:1,prbCounter:1,chgCounter:1,slaPolicy:DEFAULT_SLA_POLICY,savedViews:[],...settings};
  merged.services=(merged.services||DEFAULT_SERVICES).filter(Boolean);
  merged.assignmentGroups=(merged.assignmentGroups||DEFAULT_ASSIGNMENT_GROUPS).filter(Boolean);
  merged.savedViews=Array.isArray(merged.savedViews)?merged.savedViews.filter(Boolean).map(v=>({id:v.id||newId(),name:v.name||"Saved view",type:ORDERED_TYPES.includes(v.type)?v.type:"incident",filters:{q:v.filters?.q||"",status:v.filters?.status||"All",priority:v.filters?.priority||"All",breach:v.filters?.breach||"All",preset:v.filters?.preset||"all"}})):[];
  merged.slaPolicy=PRIORITIES.reduce((acc,p)=>{const current=(settings.slaPolicy&&settings.slaPolicy[p])||DEFAULT_SLA_POLICY[p];acc[p]={responseHours:Number(current.responseHours||DEFAULT_SLA_POLICY[p].responseHours),resolutionHours:Number(current.resolutionHours||DEFAULT_SLA_POLICY[p].resolutionHours)};return acc;},{});
  return merged;
};

function baseRecordForType(type){
  const cfg=getTypeConfig(type);
  const common={id:newId(),ticketNo:"",type,title:"",description:"",service:"Email",impact:type==="request"?"Low":"Medium",urgency:type==="request"?"Low":"Medium",priority:type==="request"?"P4":"P3",status:cfg.statuses[0],assignee:"",assignmentGroup:DEFAULT_ASSIGNMENT_GROUPS[0],pendingReason:"",dueDatesManual:false,responseDueAt:"",resolutionDueAt:"",assignedAt:null,lastWorkedAt:null,closedAt:null,linkedTickets:[],evidence:[],workNotes:[],activityLog:[],createdAt:nowIso(),updatedAt:nowIso()};
  if(type==="incident")return {...common,category:cfg.categories[0],reporter:"",resolution:"",resolvedAt:null};
  if(type==="request")return {...common,category:cfg.categories[0],requestType:"Access",requester:"",approver:"",fulfillmentNotes:"",fulfilledAt:null};
  if(type==="problem")return {...common,category:cfg.categories[0],reporter:"",rootCause:"",workaround:"",knownError:"",resolution:"",resolvedAt:null};
  return {...common,category:cfg.categories[0],requester:"",approver:"",changeType:"Standard",reason:"",implementationPlan:"",backoutPlan:"",testPlan:"",implementationSummary:"",completedAt:null};
}

const normalizeRecord=(record,settings)=>{
  const type=ORDERED_TYPES.includes(record.type)?record.type:"incident";
  const createdAt=record.createdAt||nowIso();
  const base=baseRecordForType(type);
  const merged={...base,...record,type,createdAt,updatedAt:record.updatedAt||createdAt};
  merged.priority=record.priority||calcPriority(merged.impact,merged.urgency);
  if(!merged.responseDueAt||!merged.resolutionDueAt){
    const due=getSlaTargets(merged.priority,settings,createdAt);
    merged.responseDueAt=merged.responseDueAt||due.responseDueAt;
    merged.resolutionDueAt=merged.resolutionDueAt||due.resolutionDueAt;
  }
  merged.assignmentGroup=merged.assignmentGroup||settings.assignmentGroups[0]||"";
  merged.evidence=ensureEvidence(merged.evidence||merged.links);
  merged.workNotes=ensureWorkNotes(merged.workNotes);
  merged.activityLog=ensureActivityLog(merged.activityLog);
  merged.linkedTickets=sanitizeLinks(merged.linkedTickets);
  return merged;
};

const normalizeStateShape=(payload={})=>{
  const settings=normalizeSettings(payload.settings||{});
  const arrays=ORDERED_TYPES.reduce((acc,type)=>{acc[getTypeConfig(type).arrayKey]=ensureArray(payload[getTypeConfig(type).arrayKey]).map(rec=>normalizeRecord({...rec,type},settings));return acc;},{});
  return{
    ...arrays,
    settings:{
      ...settings,
      incCounter:Math.max(settings.incCounter||1,nextTicketCounter(arrays.incidents,"INC")),
      reqCounter:Math.max(settings.reqCounter||1,nextTicketCounter(arrays.requests,"REQ")),
      prbCounter:Math.max(settings.prbCounter||1,nextTicketCounter(arrays.problems,"PRB")),
      chgCounter:Math.max(settings.chgCounter||1,nextTicketCounter(arrays.changes,"CHG")),
    },
  };
};

const getBreachMeta=(record)=>{
  if(isTerminalRecord(record))return {state:"Closed",label:"Closed",phase:"closed",hoursLeft:null,targetAt:null};
  const targetAt=record.assignedAt?record.resolutionDueAt:record.responseDueAt;
  const phase=record.assignedAt?"Resolution":"Response";
  const target=safeDate(targetAt);
  if(!target)return {state:"On Track",label:"On Track",phase,targetAt:null,hoursLeft:null};
  const hoursLeft=(target.getTime()-Date.now())/36e5;
  if(hoursLeft<0)return {state:"Breached",label:"Breached",phase,targetAt,hoursLeft};
  if(hoursLeft<=8)return {state:"Due Soon",label:"Due Soon",phase,targetAt,hoursLeft};
  return {state:"On Track",label:"On Track",phase,targetAt,hoursLeft};
};

const applyPresetToFilters=(preset)=>({q:"",status:"All",priority:"All",breach:"All",preset:preset||"all"});
const recordMatchesPreset=(record,preset,operatorName)=>{
  const breach=getBreachMeta(record).state;
  if(!preset||preset==="all")return isOpenRecord(record);
  if(preset==="my_open")return isOpenRecord(record)&&!!operatorName&&(record.assignee||"").toLowerCase()===operatorName.toLowerCase();
  if(preset==="breached")return isOpenRecord(record)&&breach==="Breached";
  if(preset==="unassigned")return isOpenRecord(record)&&!(record.assignee||"").trim();
  if(preset==="awaiting_approval")return ["request","change"].includes(record.type)&&record.status==="Pending Approval";
  if(preset==="on_hold_aging")return record.status==="On Hold"&&safeDate(record.updatedAt)&&((Date.now()-safeDate(record.updatedAt).getTime())/86400000)>3;
  if(preset==="scheduled")return record.type==="change"&&record.status==="Scheduled";
  return true;
};
const appendImportedActivity=(records,mode)=>records.map(rec=>({...rec,activityLog:[...(rec.activityLog||[]),makeActivity(mode==="replace"?"import_replace":"import_merge",mode==="replace"?"Imported via JSON replace":"Merged from JSON import")]}));
const toCsv=(rows)=>{const headers=["ticketNo","type","title","status","priority","assignmentGroup","assignee","breach","responseDueAt","resolutionDueAt","createdAt","updatedAt","service","category"];const escape=(value)=>`"${String(value??"").replace(/"/g,'""')}"`;return [headers.join(","),...rows.map(row=>headers.map(h=>escape(row[h])).join(","))].join("\n");};

const emptyIncident=(settings)=>normalizeRecord({...baseRecordForType("incident"),...getSlaTargets("P3",settings,nowIso())},settings);
const emptyRequest=(settings)=>normalizeRecord({...baseRecordForType("request"),...getSlaTargets("P4",settings,nowIso())},settings);
const emptyProblem=(settings)=>normalizeRecord({...baseRecordForType("problem"),...getSlaTargets("P3",settings,nowIso())},settings);
const emptyChange=(settings)=>normalizeRecord({...baseRecordForType("change"),...getSlaTargets("P3",settings,nowIso())},settings);

// ── SAMPLE SEED ──────────────────────────────────────────────────────────────
const seed=()=>{
  const settings=normalizeSettings({theme:"softdark",services:DEFAULT_SERVICES,assignmentGroups:DEFAULT_ASSIGNMENT_GROUPS,operatorName:DEFAULT_OPERATOR,incCounter:4,reqCounter:4,prbCounter:2,chgCounter:2});
  const now=Date.now();
  const d=(offDays)=>new Date(now-offDays*86400000).toISOString();
  const incidents=[
    normalizeRecord({...emptyIncident(settings),ticketNo:"INC00001",title:"Email not syncing on mobile",description:"Outlook mobile client stopped syncing mail after the 06:00 patch window. Desktop still works.",category:"Email",service:"Email",impact:"Medium",urgency:"High",priority:"P2",status:"In Progress",reporter:"Priya S.",assignee:"Help Desk L2",assignmentGroup:"Messaging Team",createdAt:d(1),updatedAt:d(0),assignedAt:d(1),lastWorkedAt:d(0),workNotes:[{at:d(0),by:"Help Desk L2",note:"Reproduced on iOS; escalating to messaging team."}],activityLog:[makeActivity("seed","Loaded sample incident")]},settings),
    normalizeRecord({...emptyIncident(settings),ticketNo:"INC00002",title:"VPN disconnects every 10 minutes",description:"Users in Chennai office report VPN tunnel drops. Roughly every 10 min.",category:"Network",service:"VPN",impact:"High",urgency:"High",priority:"P1",status:"Assigned",reporter:"Karthik R.",assignee:"Network Team",assignmentGroup:"Network Team",createdAt:d(0),updatedAt:d(0),assignedAt:d(0),activityLog:[makeActivity("seed","Loaded sample incident")]},settings),
    normalizeRecord({...emptyIncident(settings),ticketNo:"INC00003",title:"Printer jammed — Floor 3",description:"HP LaserJet on floor 3 jammed; paper stuck in feeder.",category:"Hardware",service:"Printers",impact:"Low",urgency:"Low",priority:"P4",status:"Resolved",reporter:"Anita D.",assignee:"Facilities",assignmentGroup:"Facilities",resolution:"Cleared jam and ran cleaning cycle. Verified 5 test pages.",createdAt:d(3),updatedAt:d(2),assignedAt:d(3),resolvedAt:d(2),lastWorkedAt:d(2),activityLog:[makeActivity("seed","Loaded sample incident")]},settings),
  ];
  const requests=[
    normalizeRecord({...emptyRequest(settings),ticketNo:"REQ00001",title:"Access to SharePoint Finance site",description:"Need read/write access to the Finance SharePoint site for quarter close.",requestType:"Access",category:"Access Request",service:"SharePoint",impact:"Low",urgency:"Medium",priority:"P3",status:"Pending Approval",requester:"Prabu P.",approver:"Finance Manager",assignmentGroup:"Help Desk L1",createdAt:d(0),updatedAt:d(0),activityLog:[makeActivity("seed","Loaded sample request")]},settings),
    normalizeRecord({...emptyRequest(settings),ticketNo:"REQ00002",title:"New laptop for joiner — 1 May",description:"Standard developer laptop for new hire starting 1 May. 16GB RAM, Windows 11.",requestType:"Hardware",category:"New Employee Setup",service:"Laptop / Desktop",impact:"Medium",urgency:"Medium",priority:"P2",status:"Approved",requester:"HR",assignee:"IT Procurement",assignmentGroup:"IT Procurement",approver:"IT Manager",createdAt:d(5),updatedAt:d(1),assignedAt:d(1),activityLog:[makeActivity("seed","Loaded sample request")]},settings),
    normalizeRecord({...emptyRequest(settings),ticketNo:"REQ00003",title:"Install Visio on workstation",description:"Need Microsoft Visio installed for architecture diagrams.",requestType:"Software",category:"New Software",service:"Laptop / Desktop",impact:"Low",urgency:"Low",priority:"P4",status:"Fulfilled",requester:"Meera J.",assignee:"Help Desk L1",assignmentGroup:"Help Desk L1",createdAt:d(7),updatedAt:d(6),assignedAt:d(7),fulfilledAt:d(6),lastWorkedAt:d(6),fulfillmentNotes:"Installed Visio Professional 2021. Licence assigned.",activityLog:[makeActivity("seed","Loaded sample request")]},settings),
  ];
  const problems=[
    normalizeRecord({...emptyProblem(settings),ticketNo:"PRB00001",title:"Recurring VPN instability in Chennai office",description:"Multiple related incidents indicate a persistent VPN concentration issue after firmware updates.",category:"Network",service:"VPN",impact:"High",urgency:"Medium",priority:"P1",status:"Known Error",reporter:"Network Team",assignee:"Network Team",assignmentGroup:"Network Team",rootCause:"Load balancer firmware defect under burst reconnect conditions.",workaround:"Move affected users to secondary concentrator during business hours.",knownError:"Vendor advisory VRM-2026-041 confirmed.",linkedTickets:["INC00002"],createdAt:d(2),updatedAt:d(0),assignedAt:d(2),lastWorkedAt:d(0),activityLog:[makeActivity("seed","Loaded sample problem")]},settings),
  ];
  const changes=[
    normalizeRecord({...emptyChange(settings),ticketNo:"CHG00001",title:"Apply VPN concentrator firmware hotfix",description:"Implement vendor hotfix to remove the reconnect instability identified under PRB00001.",category:"Network Change",service:"VPN",impact:"High",urgency:"Medium",priority:"P2",status:"Scheduled",requester:"Network Team",assignee:"Network Team",assignmentGroup:"Network Team",approver:"IT Manager",changeType:"Normal",reason:"Permanent corrective action for PRB00001.",implementationPlan:"Apply vendor hotfix to secondary concentrator, fail over sessions, patch primary, validate tunnels.",backoutPlan:"Rollback to prior firmware image and restore previous routing profile.",testPlan:"Validate tunnel stability for 30 minutes and confirm reconnect rate below alert threshold.",implementationSummary:"",linkedTickets:["PRB00001","INC00002"],createdAt:d(1),updatedAt:d(0),assignedAt:d(1),activityLog:[makeActivity("seed","Loaded sample change")]},settings),
  ];
  return normalizeStateShape({incidents,requests,problems,changes,settings});
};

// ── STATE I/O ────────────────────────────────────────────────────────────────
function loadState(){
  try{
    const rawKey=LEGACY_STORAGE_KEYS.find(key=>localStorage.getItem(key));
    if(!rawKey)return seed();
    const raw=localStorage.getItem(rawKey);
    if(!raw)return seed();
    return normalizeStateShape(JSON.parse(raw));
  }catch(e){
    console.warn("loadState failed",e);
    return seed();
  }
}
function saveState(s){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch(e){console.warn("saveState failed",e);}}

// ── UI PRIMITIVES ────────────────────────────────────────────────────────────
function PriorityPill({p,theme}){
  const t=theme;
  const m={P1:{bg:t.p1Bg,text:t.p1Text,border:t.p1Border,dot:"●"},P2:{bg:t.p2Bg,text:t.p2Text,border:t.p2Border,dot:"●"},P3:{bg:t.p3Bg,text:t.p3Text,border:t.p3Border,dot:"●"},P4:{bg:t.p4Bg,text:t.p4Text,border:t.p4Border,dot:"●"}}[p]||{bg:t.badge,text:t.badgeText,border:t.cardBorder,dot:"●"};
  return <span className="pill" style={{background:m.bg,color:m.text,border:`1px solid ${m.border}`}}>{m.dot} {p}</span>;
}
function StatusPill({s,theme}){const [bg,color]=mapStatusColors(theme,s);return <span className="pill" style={{background:bg,color}}>{s}</span>;}
function BreachPill({record,theme}){
  const t=theme;const meta=getBreachMeta(record);
  const style=meta.state==="Breached"?{bg:t.p1Bg,text:t.p1Text,border:t.p1Border}:meta.state==="Due Soon"?{bg:t.p2Bg,text:t.p2Text,border:t.p2Border}:meta.state==="Closed"?{bg:t.badge,text:t.badgeText,border:t.cardBorder}:{bg:t.p4Bg,text:t.p4Text,border:t.p4Border};
  const suffix=meta.targetAt?` · ${meta.phase}`:"";
  return <span className="pill" style={{background:style.bg,color:style.text,border:`1px solid ${style.border}`}}>{meta.label}{suffix}</span>;
}
function DateTimeInput({t,value,onChange}){return <input className="input" type="datetime-local" value={toDateTimeLocal(value)} onChange={e=>onChange(fromDateTimeLocal(e.target.value))} style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}}/>;}
function Input({t,...p}){return <input className="input" style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}} {...p}/>;}
function Textarea({t,...p}){return <textarea className="textarea" style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}} {...p}/>;}
function Select({t,options,value,onChange,...p}){return(<select className="select" value={value} onChange={onChange} style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}} {...p}>{options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select>);}
function Label({t,children}){return <div className="label" style={{color:t.textMuted}}>{children}</div>;}
function Btn({t,variant="primary",children,...p}){const styles=variant==="primary"?{background:t.accent,color:t.accentText}:variant==="ghost"?{background:"transparent",color:t.text,border:`1.5px solid ${t.cardBorder}`}:variant==="danger"?{background:t.p1Bg,color:t.p1Text,border:`1.5px solid ${t.p1Border}`}:{background:t.hover,color:t.text};return <button className="btn" style={styles} {...p}>{children}</button>;}

// ── DRAWER ───────────────────────────────────────────────────────────────────
function Drawer({record,onClose,onSave,onDelete,theme,settings}){
  const t=theme;
  const [r,setR]=useState(()=>normalizeRecord(record,settings));
  const [newNote,setNewNote]=useState("");
  const [evidenceDraft,setEvidenceDraft]=useState({label:"",url:"",reference:""});
  const [linkedDraft,setLinkedDraft]=useState("");
  const cfg=getTypeConfig(r.type);
  const isNew=!record.ticketNo;

  useEffect(()=>{
    if(r.impact&&r.urgency){
      const p=calcPriority(r.impact,r.urgency);
      if(p!==r.priority)setR(x=>{const next={...x,priority:p};if(!next.dueDatesManual){const due=getSlaTargets(p,settings,next.createdAt);next.responseDueAt=due.responseDueAt;next.resolutionDueAt=due.resolutionDueAt;}return next;});
    }
  },[r.impact,r.urgency,settings]);

  const updateField=(k,v)=>setR(x=>({...x,[k]:v}));
  const updateDue=(k,v)=>setR(x=>({...x,[k]:v,dueDatesManual:true}));
  const resetDueDates=()=>setR(x=>({...x,...getSlaTargets(x.priority,settings,x.createdAt),dueDatesManual:false}));
  const addNote=()=>{if(!newNote.trim())return;const note={at:nowIso(),by:getActor(r,settings),note:newNote.trim()};setR(x=>({...x,lastWorkedAt:note.at,workNotes:[...(x.workNotes||[]),note],activityLog:[...(x.activityLog||[]),makeActivity("work_note",`Added work note by ${note.by}`)]}));setNewNote("");};
  const addEvidence=()=>{if(!evidenceDraft.label.trim()&&!evidenceDraft.url.trim()&&!evidenceDraft.reference.trim())return;const item={id:newId(),label:evidenceDraft.label.trim()||evidenceDraft.reference.trim()||evidenceDraft.url.trim(),url:evidenceDraft.url.trim(),reference:evidenceDraft.reference.trim()};setR(x=>({...x,evidence:[...(x.evidence||[]),item]}));setEvidenceDraft({label:"",url:"",reference:""});};
  const removeEvidence=(id)=>setR(x=>({...x,evidence:(x.evidence||[]).filter(item=>item.id!==id)}));
  const addLinkedTicket=()=>{const value=linkedDraft.trim().toUpperCase();if(!value)return;setR(x=>({...x,linkedTickets:sanitizeLinks([...(x.linkedTickets||[]),value])}));setLinkedDraft("");};
  const removeLinkedTicket=(value)=>setR(x=>({...x,linkedTickets:(x.linkedTickets||[]).filter(ticket=>ticket!==value)}));

  const submit=(e)=>{
    e.preventDefault();
    if(!r.title.trim()){alert("Title is required.");return;}
    const validation=cfg.validate(r);
    if(validation){alert(validation);return;}
    if(r.status==="On Hold"&&!r.pendingReason.trim()&&!confirm("This ticket is going On Hold without a pending reason. Continue?"))return;
    const confirmMessage=cfg.confirm(r,record);
    if(confirmMessage&&!confirm(confirmMessage))return;

    const updated={...r,updatedAt:nowIso(),linkedTickets:sanitizeLinks(r.linkedTickets)};
    const prevStatus=record.status;
    const wasTerminal=isTerminalRecord(record);
    const nowTerminal=isTerminalRecord(updated);
    const assignmentChanged=isMeaningfulChange(record.assignee,updated.assignee)||isMeaningfulChange(record.assignmentGroup,updated.assignmentGroup);
    const meaningfulTouch=assignmentChanged||isMeaningfulChange(record.status,updated.status)||isMeaningfulChange(record[cfg.noteField],updated[cfg.noteField]);

    if(assignmentChanged&&!updated.assignedAt&&(updated.assignee||updated.assignmentGroup))updated.assignedAt=nowIso();
    const milestoneField=cfg.milestoneField;
    const terminalField=cfg.autoCloseField;
    if(updated.status===cfg.milestoneStatus&&!updated[milestoneField])updated[milestoneField]=nowIso();
    if(updated.status==="Closed"&&!updated[terminalField])updated[terminalField]=nowIso();
    if(updated.status!==cfg.milestoneStatus&&updated.status!=="Closed"&&cfg.terminalStatuses.includes(updated.status)&&!updated[terminalField])updated[terminalField]=nowIso();
    if(![cfg.milestoneStatus,"Closed"].includes(updated.status))updated[milestoneField]=null;
    if(!cfg.terminalStatuses.includes(updated.status)&&terminalField==="closedAt")updated.closedAt=null;
    if(updated.type==="change"){
      if(updated.status==="Completed"&&!updated.completedAt)updated.completedAt=nowIso();
      if(updated.status!=="Completed")updated.completedAt=null;
    }
    if(wasTerminal&&!nowTerminal)updated.activityLog=[...(updated.activityLog||[]),makeActivity("reopened",`Reopened from ${prevStatus}`)];
    if(meaningfulTouch)updated.lastWorkedAt=updated.updatedAt;
    onSave(updated);
  };

  const esc=useCallback((e)=>{if(e.key==="Escape")onClose();},[onClose]);
  useEffect(()=>{document.addEventListener("keydown",esc);return()=>document.removeEventListener("keydown",esc);},[esc]);
  const breach=getBreachMeta(r);

  return(
    <>
      <div className="drawer-overlay" onClick={onClose}/>
      <form className="drawer" onSubmit={submit} style={{background:t.card,color:t.text}}>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${t.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <div className="ui-section" style={{color:t.textMuted}}>{cfg.icon} {cfg.label}{r.ticketNo?` · ${r.ticketNo}`:" · New"}</div>
            <div className="ui-title" style={{fontSize:18,fontWeight:700,marginTop:4}}>{isNew?cfg.createLabel:`Edit ${cfg.label}`}</div>
          </div>
          <button type="button" onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.textMuted,fontSize:22,padding:4}}>✕</button>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>
          <div className="drawer-shell">
            <div className="drawer-main">
              <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:16}}>
                <div className="drawer-panel-title">
                  <div>
                    <div className="ui-section" style={{fontSize:12,color:t.text}}>Summary</div>
                    <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>Primary ticket details and triage context.</div>
                  </div>
                  <div className="ui-ticket" style={{color:t.textMuted}}>{r.ticketNo||"Pending Number"}</div>
                </div>
                <div className="drawer-stack">
                  <div>
                    <Label t={t}>Title / Summary *</Label>
                    <Input t={t} value={r.title} onChange={e=>updateField("title",e.target.value)} placeholder="Short summary" autoFocus/>
                  </div>
                  <div>
                    <Label t={t}>Description</Label>
                    <Textarea t={t} value={r.description} onChange={e=>updateField("description",e.target.value)} placeholder="Describe the issue, request, root cause, or planned change."/>
                  </div>
                </div>
              </div>

              <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:16}}>
                <div className="drawer-panel-title">
                  <div>
                    <div className="ui-section" style={{fontSize:12,color:t.text}}>Operational Controls</div>
                    <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>Status, ownership, priority, and service context.</div>
                  </div>
                  <BreachPill record={r} theme={t}/>
                </div>
                <div className="drawer-band">
                  <div>
                    <Label t={t}>{cfg.categoryLabel}</Label>
                    <Select t={t} value={r.category} onChange={e=>updateField("category",e.target.value)} options={cfg.categories}/>
                  </div>
                  <div>
                    <Label t={t}>Affected Service</Label>
                    <Select t={t} value={r.service} onChange={e=>updateField("service",e.target.value)} options={settings.services}/>
                  </div>
                </div>

                {r.type==="request"&&(
                  <div style={{marginTop:14}}>
                    <Label t={t}>Request Type</Label>
                    <Select t={t} value={r.requestType} onChange={e=>updateField("requestType",e.target.value)} options={["Access","Hardware","Software","Information","Change","Other"]}/>
                  </div>
                )}
                {r.type==="change"&&(
                  <div style={{marginTop:14}}>
                    <Label t={t}>Change Type</Label>
                    <Select t={t} value={r.changeType} onChange={e=>updateField("changeType",e.target.value)} options={["Standard","Normal","Emergency"]}/>
                  </div>
                )}

                <div className="drawer-band-3" style={{marginTop:14}}>
                  <div><Label t={t}>Impact</Label><Select t={t} value={r.impact} onChange={e=>updateField("impact",e.target.value)} options={IMPACT_LEVELS}/></div>
                  <div><Label t={t}>Urgency</Label><Select t={t} value={r.urgency} onChange={e=>updateField("urgency",e.target.value)} options={URGENCY_LEVELS}/></div>
                  <div><Label t={t}>Priority</Label><div style={{display:"flex",alignItems:"center",height:38}}><PriorityPill p={r.priority} theme={t}/></div></div>
                </div>

                <div className="drawer-band" style={{marginTop:14}}>
                  <div><Label t={t}>Status</Label><Select t={t} value={r.status} onChange={e=>updateField("status",e.target.value)} options={cfg.statuses}/></div>
                  <div>
                    <Label t={t}>Breach Target</Label>
                    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",gap:8,background:t.card,border:`1px solid ${t.cardBorder}`,padding:"9px 12px",borderRadius:10}}>
                      <span className="ui-time" style={{color:t.textMuted}}>{breach.targetAt?fmtDateTime(breach.targetAt):"No target"}</span>
                      <span className="ui-helper" style={{color:t.textFaint}}>{breach.phase||"—"}</span>
                    </div>
                  </div>
                </div>

                <div className="drawer-band" style={{marginTop:14}}>
                  <div><Label t={t}>Assignment Group</Label><Select t={t} value={r.assignmentGroup||""} onChange={e=>updateField("assignmentGroup",e.target.value)} options={settings.assignmentGroups}/></div>
                  <div><Label t={t}>Assignee</Label><Input t={t} value={r.assignee} onChange={e=>updateField("assignee",e.target.value)} placeholder="Who is working on it"/></div>
                </div>

                <div className="drawer-band" style={{marginTop:14}}>
                  <div><Label t={t}>{cfg.subjectLabel}</Label><Input t={t} value={r[cfg.subjectField]||""} onChange={e=>updateField(cfg.subjectField,e.target.value)} placeholder="Name"/></div>
                  <div><Label t={t}>On Hold Reason</Label><Input t={t} value={r.pendingReason||""} onChange={e=>updateField("pendingReason",e.target.value)} placeholder="Vendor, requester, parts, approval..."/></div>
                </div>

                {(r.type==="request"||r.type==="change")&&(
                  <div style={{marginTop:14}}><Label t={t}>Approver</Label><Input t={t} value={r.approver||""} onChange={e=>updateField("approver",e.target.value)} placeholder="Approver name"/></div>
                )}
              </div>

              {r.type==="problem"&&(
                <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:16}}>
                  <div className="drawer-panel-title">
                    <div>
                      <div className="ui-section" style={{fontSize:12,color:t.text}}>Problem Analysis</div>
                      <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>Capture root-cause investigation and mitigation.</div>
                    </div>
                  </div>
                  <div className="drawer-band">
                    <div><Label t={t}>Root Cause</Label><Textarea t={t} value={r.rootCause||""} onChange={e=>updateField("rootCause",e.target.value)} placeholder="Underlying cause"/></div>
                    <div><Label t={t}>Workaround</Label><Textarea t={t} value={r.workaround||""} onChange={e=>updateField("workaround",e.target.value)} placeholder="Temporary mitigation"/></div>
                  </div>
                  <div style={{marginTop:14}}><Label t={t}>Known Error Details</Label><Textarea t={t} value={r.knownError||""} onChange={e=>updateField("knownError",e.target.value)} placeholder="Reference the known error record or summary."/></div>
                </div>
              )}

              {r.type==="change"&&(
                <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:16}}>
                  <div className="drawer-panel-title">
                    <div>
                      <div className="ui-section" style={{fontSize:12,color:t.text}}>Change Delivery</div>
                      <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>Planning, rollback, and validation for controlled change work.</div>
                    </div>
                  </div>
                  <div><Label t={t}>Reason / Business Justification</Label><Textarea t={t} value={r.reason||""} onChange={e=>updateField("reason",e.target.value)} placeholder="Why is this change needed?"/></div>
                  <div className="drawer-band" style={{marginTop:14}}>
                    <div><Label t={t}>Implementation Plan</Label><Textarea t={t} value={r.implementationPlan||""} onChange={e=>updateField("implementationPlan",e.target.value)} placeholder="Implementation steps"/></div>
                    <div><Label t={t}>Backout Plan</Label><Textarea t={t} value={r.backoutPlan||""} onChange={e=>updateField("backoutPlan",e.target.value)} placeholder="Rollback steps"/></div>
                  </div>
                  <div style={{marginTop:14}}><Label t={t}>Test Plan</Label><Textarea t={t} value={r.testPlan||""} onChange={e=>updateField("testPlan",e.target.value)} placeholder="Validation and success criteria"/></div>
                </div>
              )}

              <div>
                <Label t={t}>{cfg.noteLabel}</Label>
                <Textarea t={t} value={r[cfg.noteField]||""} onChange={e=>updateField(cfg.noteField,e.target.value)} placeholder={cfg.notePlaceholder}/>
              </div>

              {!isNew&&(
                <>
                  <div className="divider-h" style={{background:t.divider}}/>
                  <div className="drawer-history">
                    <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:14}}>
                      <div className="drawer-panel-title">
                        <Label t={t}>Work Notes</Label>
                      </div>
                      <div style={{display:"flex",gap:8,marginBottom:10}}>
                        <Input t={t} value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add a work note..." onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addNote();}}}/>
                        <Btn t={t} type="button" onClick={addNote}>Add</Btn>
                      </div>
                      <div className="drawer-scroll-section">
                        {(r.workNotes||[]).slice().reverse().map((n,i)=><div key={i} style={{background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:8,padding:"8px 12px",marginBottom:6}}><div className="ui-time" style={{color:t.textMuted,marginBottom:3}}>{fmtDateTime(n.at)} · {n.by||"—"}</div><div className="ui-copy" style={{fontSize:13,color:t.text,whiteSpace:"pre-wrap"}}>{n.note}</div></div>)}
                        {(!r.workNotes||r.workNotes.length===0)&&<div className="ui-helper" style={{color:t.textFaint,fontStyle:"italic"}}>No work notes yet.</div>}
                      </div>
                    </div>

                    <div className="drawer-side">
                      <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:14}}>
                        <div className="drawer-panel-title">
                          <Label t={t}>Audit Trail</Label>
                        </div>
                        <div className="drawer-scroll-section">
                          {(r.activityLog||[]).slice().reverse().map(item=><div key={item.id} style={{background:t.card,border:`1px solid ${t.cardBorder}`,borderRadius:8,padding:"8px 12px",marginBottom:6}}><div className="ui-time" style={{color:t.textMuted,marginBottom:3}}>{fmtDateTime(item.at)} · {item.action}</div><div className="ui-copy" style={{fontSize:13,color:t.text}}>{item.note||"Updated ticket"}</div></div>)}
                          {(!r.activityLog||r.activityLog.length===0)&&<div className="ui-helper" style={{color:t.textFaint,fontStyle:"italic"}}>No audit entries yet.</div>}
                        </div>
                      </div>

                      <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:14}}>
                        <div className="drawer-panel-title">
                          <Label t={t}>Timestamps</Label>
                        </div>
                        <div className="drawer-band" style={{fontSize:12,color:t.textMuted}}>
                          <div><b style={{color:t.text}}>Created:</b><br/>{fmtDateTime(r.createdAt)}</div>
                          <div><b style={{color:t.text}}>Last Updated:</b><br/>{fmtDateTime(r.updatedAt)}</div>
                          <div><b style={{color:t.text}}>Assigned:</b><br/>{fmtDateTime(r.assignedAt)}</div>
                          <div><b style={{color:t.text}}>Last Worked:</b><br/>{fmtDateTime(r.lastWorkedAt)}</div>
                          {r[getMilestoneField(r.type)]&&<div><b style={{color:t.text}}>{cfg.milestoneLabel}:</b><br/>{fmtDateTime(r[getMilestoneField(r.type)])}</div>}
                          {r.closedAt&&<div><b style={{color:t.text}}>Closed:</b><br/>{fmtDateTime(r.closedAt)}</div>}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="drawer-side">
              <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:14}}>
                <div className="drawer-panel-title">
                  <div>
                    <div className="ui-section" style={{fontSize:12,color:t.text}}>SLA Targets</div>
                    <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>Response and resolution targets for this ticket.</div>
                  </div>
                  <Btn t={t} type="button" variant="ghost" onClick={resetDueDates}>Auto from Policy</Btn>
                </div>
                <div className="drawer-stack">
                  <div><Label t={t}>Response Due</Label><DateTimeInput t={t} value={r.responseDueAt} onChange={value=>updateDue("responseDueAt",value)}/></div>
                  <div><Label t={t}>Resolution Due</Label><DateTimeInput t={t} value={r.resolutionDueAt} onChange={value=>updateDue("resolutionDueAt",value)}/></div>
                </div>
              </div>

              <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:14}}>
                <div className="drawer-panel-title">
                  <div>
                    <div className="ui-section" style={{fontSize:12,color:t.text}}>Linked Tickets</div>
                    <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>Reference related incidents, requests, problems, or changes.</div>
                  </div>
                </div>
                <div style={{display:"flex",gap:8,marginBottom:10}}>
                  <Input t={t} value={linkedDraft} onChange={e=>setLinkedDraft(e.target.value)} placeholder="INC00012, PRB00003, CHG00007..." onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addLinkedTicket();}}}/>
                  <Btn t={t} type="button" onClick={addLinkedTicket}>Add</Btn>
                </div>
                {(r.linkedTickets||[]).length===0&&<div className="ui-helper" style={{color:t.textFaint,fontStyle:"italic"}}>No linked tickets yet.</div>}
                <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
                  {(r.linkedTickets||[]).map(ticket=>(
                    <span key={ticket} className="pill ui-ticket" style={{background:t.badge,color:t.text,border:`1px solid ${t.cardBorder}`}}>{ticket}<button type="button" onClick={()=>removeLinkedTicket(ticket)} style={{background:"none",border:"none",cursor:"pointer",color:t.textFaint,marginLeft:6,fontSize:13}}>✕</button></span>
                  ))}
                </div>
              </div>

              <div className="card" style={{background:t.bg,borderColor:t.cardBorder,padding:14}}>
                <div className="drawer-panel-title">
                  <div>
                    <div className="ui-section" style={{fontSize:12,color:t.text}}>Evidence / References</div>
                    <div className="ui-helper" style={{color:t.textMuted,marginTop:4}}>URLs, filenames, or reference notes tied to the ticket.</div>
                  </div>
                </div>
                <div className="drawer-stack">
                  <div className="drawer-band">
                    <Input t={t} value={evidenceDraft.label} onChange={e=>setEvidenceDraft(x=>({...x,label:e.target.value}))} placeholder="Label"/>
                    <Input t={t} value={evidenceDraft.url} onChange={e=>setEvidenceDraft(x=>({...x,url:e.target.value}))} placeholder="URL (optional)"/>
                  </div>
                  <div style={{display:"flex",gap:8}}>
                    <Input t={t} value={evidenceDraft.reference} onChange={e=>setEvidenceDraft(x=>({...x,reference:e.target.value}))} placeholder="Reference / filename / path"/>
                    <Btn t={t} type="button" onClick={addEvidence}>Add</Btn>
                  </div>
                </div>
                <div className="drawer-scroll-section" style={{marginTop:10}}>
                  {(r.evidence||[]).length===0&&<div className="ui-helper" style={{color:t.textFaint,fontStyle:"italic"}}>No evidence linked yet.</div>}
                  {(r.evidence||[]).map(item=>(
                    <div key={item.id} style={{display:"flex",alignItems:"center",gap:10,background:t.card,border:`1px solid ${t.cardBorder}`,padding:"8px 10px",borderRadius:8,marginBottom:6}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div className="ui-table-title" style={{color:t.text}}>{item.label}</div>
                        <div className="ui-meta" style={{color:t.textMuted,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{item.url||item.reference||"Reference"}</div>
                      </div>
                      {item.url&&<a href={item.url} target="_blank" rel="noreferrer" style={{fontSize:12,color:t.accent,textDecoration:"none"}}>Open</a>}
                      <button type="button" onClick={()=>removeEvidence(item.id)} style={{background:"none",border:"none",cursor:"pointer",color:t.textFaint,fontSize:14}}>✕</button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div style={{padding:"14px 22px",borderTop:`1px solid ${t.cardBorder}`,display:"flex",gap:10,justifyContent:"space-between",flexShrink:0}}>
          <div>{!isNew&&<Btn t={t} variant="danger" type="button" onClick={()=>{if(confirm("Delete this ticket permanently?"))onDelete(r);}}>🗑 Delete</Btn>}</div>
          <div style={{display:"flex",gap:10}}><Btn t={t} variant="ghost" type="button" onClick={onClose}>Cancel</Btn><Btn t={t} type="submit">{isNew?cfg.createLabel:"Save Changes"}</Btn></div>
        </div>
      </form>
    </>
  );
}

// ── REGISTER VIEW ────────────────────────────────────────────────────────────
function Register({records,type,theme,onOpen,onNew,settings,presetKey,onSaveView,onDeleteView}){
  const t=theme;const cfg=getTypeConfig(type);const [filters,setFilters]=useState(applyPresetToFilters(presetKey));const savedViews=(settings.savedViews||[]).filter(view=>view.type===type);
  useEffect(()=>{setFilters(applyPresetToFilters(presetKey));},[presetKey,type]);
  const applySavedView=(id)=>{const found=savedViews.find(view=>view.id===id);if(found)setFilters(copyFilters(found.filters));};
  const filtered=useMemo(()=>{let rows=records.filter(r=>r.type===type);rows=rows.filter(r=>recordMatchesPreset(r,filters.preset,settings.operatorName));if(filters.q){const qq=filters.q.toLowerCase();rows=rows.filter(r=>(r.title||"").toLowerCase().includes(qq)||(r.ticketNo||"").toLowerCase().includes(qq)||(r.description||"").toLowerCase().includes(qq)||(r.assignee||"").toLowerCase().includes(qq)||((r.reporter||r.requester||"").toLowerCase().includes(qq))||(r.assignmentGroup||"").toLowerCase().includes(qq)||(r.linkedTickets||[]).some(x=>x.toLowerCase().includes(qq)));}if(filters.status!=="All")rows=rows.filter(r=>r.status===filters.status);if(filters.priority!=="All")rows=rows.filter(r=>r.priority===filters.priority);if(filters.breach!=="All")rows=rows.filter(r=>getBreachMeta(r).state===filters.breach);return rows.sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt));},[records,type,filters,settings.operatorName]);
  return(
    <div style={{padding:"20px 28px",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div>
          <div className="ui-title" style={{fontSize:22,fontWeight:700,color:t.text}}>{cfg.icon} {cfg.title}</div>
          <div className="ui-copy" style={{fontSize:13,color:t.textMuted,marginTop:4}}>{cfg.subtitle}</div>
        </div>
        <Btn t={t} onClick={onNew}>+ {cfg.createLabel}</Btn>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
        {cfg.presets.map(key=><button key={key} onClick={()=>setFilters(f=>({...f,preset:key}))} style={{padding:"7px 10px",borderRadius:999,border:`1px solid ${filters.preset===key?t.accent:t.cardBorder}`,background:filters.preset===key?t.accent:t.card,color:filters.preset===key?t.accentText:t.text,cursor:"pointer",fontSize:12,fontFamily:"var(--font-body)",letterSpacing:"0.02em"}}>{PRESET_TITLES[key]}</button>)}
      </div>

      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:"1 1 260px",minWidth:220}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:t.textFaint,fontSize:14,pointerEvents:"none"}}>🔍</span>
          <Input t={t} value={filters.q} onChange={e=>setFilters(f=>({...f,q:e.target.value}))} placeholder="Search title, number, description, assignee, team..." style={{paddingLeft:34}}/>
        </div>
        <Select t={t} value={filters.status} onChange={e=>setFilters(f=>({...f,status:e.target.value}))} options={["All",...cfg.statuses]} style={{width:190}}/>
        <Select t={t} value={filters.priority} onChange={e=>setFilters(f=>({...f,priority:e.target.value}))} options={["All",...PRIORITIES]} style={{width:130}}/>
        <Select t={t} value={filters.breach} onChange={e=>setFilters(f=>({...f,breach:e.target.value}))} options={BREACH_FILTERS} style={{width:140}}/>
      </div>

      <div style={{display:"flex",gap:8,marginBottom:12,flexWrap:"wrap",alignItems:"center"}}>
        <Select t={t} value="" onChange={e=>applySavedView(e.target.value)} options={[{value:"",label:"Saved Views..."},...savedViews.map(v=>({value:v.id,label:v.name}))]} style={{width:180}}/>
        <Btn t={t} variant="ghost" onClick={()=>onSaveView(type,filters)}>Save Current View</Btn>
        {savedViews.length>0&&<Btn t={t} variant="ghost" onClick={()=>{const name=prompt("Delete which saved view? Enter exact name.");if(name)onDeleteView(type,name);}}>Delete Saved View</Btn>}
      </div>

      <div style={{flex:1,overflow:"auto",border:`1px solid ${t.cardBorder}`,borderRadius:12,background:t.card}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead style={{position:"sticky",top:0,background:t.card,zIndex:2}}>
            <tr style={{borderBottom:`1px solid ${t.cardBorder}`,textAlign:"left"}}>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Ticket#</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Title</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Priority</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Status</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>SLA</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Team</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Assignee</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Aging</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r=>{const breach=getBreachMeta(r);return(
              <tr key={r.id} className="tbl-row" onClick={()=>onOpen(r)} style={{borderBottom:`1px solid ${t.divider}`}} onMouseEnter={e=>e.currentTarget.style.background=t.hover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td className="ui-ticket" style={{padding:"11px 14px",color:t.textMuted}}>{r.ticketNo}</td>
                <td style={{padding:"11px 14px",color:t.text}}>
                  <div className="ui-table-title" style={{maxWidth:260,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",color:t.text}}>{r.title}</div>
                  <div className="ui-meta" style={{color:t.textFaint}}>{r.service} · {r.category}{r.linkedTickets?.length?` · links ${r.linkedTickets.length}`:""}</div>
                </td>
                <td style={{padding:"11px 14px"}}><PriorityPill p={r.priority} theme={t}/></td>
                <td style={{padding:"11px 14px"}}><StatusPill s={r.status} theme={t}/></td>
                <td style={{padding:"11px 14px"}}><BreachPill record={r} theme={t}/><div className="ui-time" style={{color:t.textFaint,marginTop:4}}>{breach.targetAt?fmtDateTime(breach.targetAt):"—"}</div></td>
                <td style={{padding:"11px 14px",color:t.textMuted}}>{r.assignmentGroup||"—"}</td>
                <td style={{padding:"11px 14px",color:t.textMuted}}>{r.assignee||"—"}</td>
                <td style={{padding:"11px 14px",color:t.textMuted}}><div className="ui-data">{humanAge(r.createdAt)}</div><div className="ui-time" style={{color:t.textFaint}}>worked {humanAge(r.lastWorkedAt||r.updatedAt)}</div></td>
              </tr>
            );})}
            {filtered.length===0&&<tr><td colSpan={8} style={{padding:"60px 20px",textAlign:"center",color:t.textFaint}}><div style={{fontSize:40,marginBottom:10,opacity:0.4}}>{cfg.icon}</div><div style={{fontSize:14,fontWeight:600,marginBottom:4,color:t.textMuted}}>Nothing to show</div><div style={{fontSize:12}}>No records match the current queue view.</div></td></tr>}
          </tbody>
        </table>
      </div>
      <div style={{marginTop:10,fontSize:12,color:t.textFaint,textAlign:"right"}}>{filtered.length} record{filtered.length===1?"":"s"}</div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({state,theme,onOpen,onOpenQueue}){
  const t=theme;
  const rowsByType=ORDERED_TYPES.reduce((acc,type)=>{acc[type]=state[getTypeConfig(type).arrayKey]||[];return acc;},{});
  const openByType=ORDERED_TYPES.reduce((acc,type)=>{acc[type]=rowsByType[type].filter(isOpenRecord);return acc;},{});
  const all=ORDERED_TYPES.flatMap(type=>rowsByType[type]);
  const openAll=ORDERED_TYPES.flatMap(type=>openByType[type]);
  const breached=openAll.filter(r=>getBreachMeta(r).state==="Breached");
  const unassigned=openAll.filter(r=>!(r.assignee||"").trim());
  const awaitingApprovalRequests=openByType.request.filter(r=>r.status==="Pending Approval");
  const awaitingApprovalChanges=openByType.change.filter(r=>r.status==="Pending Approval");
  const scheduled=openByType.change.filter(r=>r.status==="Scheduled");
  const onHoldAging=openAll.filter(r=>r.status==="On Hold"&&safeDate(r.updatedAt)&&((Date.now()-safeDate(r.updatedAt).getTime())/86400000)>3);
  const recent=[...all].sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)).slice(0,12);
  const countBy=(rows,key)=>rows.reduce((acc,row)=>{acc[row[key]]=(acc[row[key]]||0)+1;return acc;},{});const openByPriority=countBy(openAll,"priority");
  const priorityAging=PRIORITIES.map(priority=>({priority,count:openAll.filter(r=>r.priority===priority).length,avgAge:Math.round(openAll.filter(r=>r.priority===priority).reduce((sum,r)=>sum+((Date.now()-safeDate(r.createdAt).getTime())/86400000),0)/(openAll.filter(r=>r.priority===priority).length||1))}));
  const Stat=({num,label,color,onClick,sub})=><div className="stat-card" style={{background:t.card,borderColor:t.cardBorder,cursor:onClick?"pointer":"default"}} onClick={onClick}><div className="stat-num ui-kpi" style={{color:color||t.text}}>{num}</div><div className="stat-label" style={{color:t.textMuted}}>{label}</div>{sub&&<div style={{fontSize:11,color:t.textFaint,marginTop:6}}>{sub}</div>}</div>;

  return(
    <div style={{padding:"20px 28px",overflowY:"auto",height:"100%"}}>
      <div className="ui-title" style={{fontSize:22,fontWeight:700,color:t.text}}>Dashboard</div>
      <div className="ui-copy" style={{fontSize:13,color:t.textMuted,marginTop:4,marginBottom:20}}>Operational queue view for incidents, requests, problems, and changes.</div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:24}}>
        <Stat num={openByType.incident.length} label="Open Incidents" color={t.p1Text} onClick={()=>onOpenQueue("incident","all")}/>
        <Stat num={openByType.request.length} label="Open Requests" color={t.accent} onClick={()=>onOpenQueue("request","all")}/>
        <Stat num={openByType.problem.length} label="Open Problems" color={t.p2Text} onClick={()=>onOpenQueue("problem","all")}/>
        <Stat num={openByType.change.length} label="Open Changes" color={t.stProgText} onClick={()=>onOpenQueue("change","all")}/>
        <Stat num={breached.length} label="Breached Tickets" color={t.p1Text} sub="Across all registers"/>
        <Stat num={awaitingApprovalRequests.length} label="Requests Awaiting Approval" color={t.stOpenText} onClick={()=>onOpenQueue("request","awaiting_approval")}/>
        <Stat num={awaitingApprovalChanges.length} label="Changes Awaiting Approval" color={t.stNewText} onClick={()=>onOpenQueue("change","awaiting_approval")}/>
        <Stat num={scheduled.length} label="Scheduled Changes" color={t.stNewText} onClick={()=>onOpenQueue("change","scheduled")}/>
        <Stat num={unassigned.length} label="Unassigned" color={t.p2Text} sub="Use queue presets in each register"/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1.1fr 0.9fr",gap:16,marginBottom:20}}>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div className="ui-section" style={{fontSize:12,color:t.text,marginBottom:12}}>Open Queue by Priority</div>
          <div className="bar" style={{background:t.bg,border:`1px solid ${t.cardBorder}`}}>
            {PRIORITIES.map(p=>{const c=openByPriority[p]||0;if(!c)return null;return <span key={p} style={{width:`${(c/(openAll.length||1))*100}%`,background:p==="P1"?t.p1Text:p==="P2"?t.p2Text:p==="P3"?t.p3Text:t.p4Text}}/>;})}
          </div>
          <div style={{display:"flex",gap:12,flexWrap:"wrap",marginTop:10}}>{PRIORITIES.map(p=><div key={p} className="ui-meta" style={{color:t.textMuted}}><b className="ui-data" style={{color:t.text}}>{openByPriority[p]||0}</b> {p}</div>)}</div>
        </div>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div className="ui-section" style={{fontSize:12,color:t.text,marginBottom:12}}>Aging by Priority</div>
          {priorityAging.map(item=><div key={item.priority} className="ui-copy" style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:`1px solid ${t.divider}`,fontSize:13}}><span style={{display:"flex",alignItems:"center",gap:8}}><PriorityPill p={item.priority} theme={t}/> <span className="ui-meta" style={{color:t.textMuted}}>{item.count} open</span></span><span className="ui-time" style={{color:t.textMuted}}>avg {item.count?`${item.avgAge}d`:"—"}</span></div>)}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div className="ui-section" style={{fontSize:12,color:t.text,marginBottom:12}}>Most Urgent Breaches</div>
          {breached.slice(0,6).map(r=><div key={r.id} onClick={()=>onOpen(r)} style={{display:"flex",alignItems:"center",gap:10,padding:"9px 8px",borderBottom:`1px solid ${t.divider}`,cursor:"pointer"}}><span style={{fontSize:16,width:20}}>{getTypeConfig(r.type).icon}</span><span className="ui-ticket" style={{color:t.textMuted,minWidth:80}}>{r.ticketNo}</span><span className="ui-table-title" style={{flex:1,color:t.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</span><BreachPill record={r} theme={t}/></div>)}
          {breached.length===0&&<div className="ui-helper" style={{color:t.textFaint,fontStyle:"italic"}}>No breached tickets.</div>}
        </div>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div className="ui-section" style={{fontSize:12,color:t.text,marginBottom:12}}>Recent Activity</div>
          {recent.map(r=><div key={r.id} onClick={()=>onOpen(r)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 8px",borderRadius:8,cursor:"pointer",borderBottom:`1px solid ${t.divider}`}}><span style={{fontSize:16,width:22}}>{getTypeConfig(r.type).icon}</span><span className="ui-ticket" style={{color:t.textMuted,minWidth:80}}>{r.ticketNo}</span><PriorityPill p={r.priority} theme={t}/><span className="ui-table-title" style={{flex:1,color:t.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</span><StatusPill s={r.status} theme={t}/><span className="ui-time" style={{color:t.textFaint,minWidth:90,textAlign:"right"}}>{fmtDate(r.updatedAt)}</span></div>)}
        </div>
      </div>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({state,setState,theme,setToast}){
  const t=theme;const [newService,setNewService]=useState("");const [newGroup,setNewGroup]=useState("");const fileRef=useRef();
  const exportJson=()=>{const data={...state,exportedAt:nowIso(),version:3};const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`itsm-register-${todayStr()}.json`;a.click();URL.revokeObjectURL(url);setToast("Exported JSON");};
  const exportCsv=()=>{const rows=ORDERED_TYPES.flatMap(type=>(state[getTypeConfig(type).arrayKey]||[])).map(r=>({ticketNo:r.ticketNo,type:r.type,title:r.title,status:r.status,priority:r.priority,assignmentGroup:r.assignmentGroup,assignee:r.assignee,breach:getBreachMeta(r).state,responseDueAt:r.responseDueAt,resolutionDueAt:r.resolutionDueAt,createdAt:r.createdAt,updatedAt:r.updatedAt,service:r.service,category:r.category}));const blob=new Blob([toCsv(rows)],{type:"text/csv;charset=utf-8"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`itsm-register-${todayStr()}.csv`;a.click();URL.revokeObjectURL(url);setToast("Exported CSV");};
  const importJson=(e)=>{const f=e.target.files[0];if(!f)return;const reader=new FileReader();reader.onload=(ev)=>{try{const parsed=JSON.parse(ev.target.result);if(!parsed.incidents||!parsed.requests){alert("File is not a valid ITSM export.");return;}if(!confirm("Import this ITSM export? This will REPLACE current data."))return;const normalized=normalizeStateShape(parsed);ORDERED_TYPES.forEach(type=>{const key=getTypeConfig(type).arrayKey;normalized[key]=appendImportedActivity(normalized[key],"replace");});setState(normalized);setToast("Imported successfully");}catch(err){alert(`Could not parse JSON: ${err.message}`);}};reader.readAsText(f);e.target.value="";};
  const mergeImport=(e)=>{const f=e.target.files[0];if(!f)return;const reader=new FileReader();reader.onload=(ev)=>{try{const parsed=JSON.parse(ev.target.result);if(!parsed.incidents||!parsed.requests){alert("File is not a valid ITSM export.");return;}const normalized=normalizeStateShape(parsed);const existingIds=new Set(ORDERED_TYPES.flatMap(type=>(state[getTypeConfig(type).arrayKey]||[])).map(r=>r.id));const incoming={};ORDERED_TYPES.forEach(type=>{const key=getTypeConfig(type).arrayKey;incoming[key]=appendImportedActivity(normalized[key].filter(r=>!existingIds.has(r.id)),"merge");});const total=ORDERED_TYPES.reduce((sum,type)=>sum+incoming[getTypeConfig(type).arrayKey].length,0);if(!confirm(`Merge in ${total} new records (skipping duplicates)?`))return;setState(s=>{const payload={settings:{...s.settings,services:[...new Set([...(s.settings.services||[]),...(normalized.settings.services||[])])],assignmentGroups:[...new Set([...(s.settings.assignmentGroups||[]),...(normalized.settings.assignmentGroups||[])])]},};ORDERED_TYPES.forEach(type=>{const key=getTypeConfig(type).arrayKey;payload[key]=[...(s[key]||[]),...incoming[key]];});return normalizeStateShape(payload);});setToast(`Merged ${total} new records`);}catch(err){alert(`Could not parse JSON: ${err.message}`);}};reader.readAsText(f);e.target.value="";};
  const clearAll=()=>{if(!confirm("This will delete ALL records. This cannot be undone. Continue?"))return;if(!confirm("Are you absolutely sure? All data will be lost."))return;setState(normalizeStateShape({incidents:[],requests:[],problems:[],changes:[],settings:{...state.settings,incCounter:1,reqCounter:1,prbCounter:1,chgCounter:1}}));setToast("All data cleared");};
  const resetSeed=()=>{if(!confirm("Replace current data with sample seed data?"))return;setState(seed());setToast("Sample data loaded");};
  const addService=()=>{const value=newService.trim();if(!value)return;if(state.settings.services.includes(value)){setToast("Service already exists");return;}setState(s=>({...s,settings:{...s.settings,services:[...s.settings.services,value]}}));setNewService("");};
  const addGroup=()=>{const value=newGroup.trim();if(!value)return;if(state.settings.assignmentGroups.includes(value)){setToast("Assignment group already exists");return;}setState(s=>({...s,settings:{...s.settings,assignmentGroups:[...s.settings.assignmentGroups,value]}}));setNewGroup("");};
  const removeService=(svc)=>setState(s=>({...s,settings:{...s.settings,services:s.settings.services.filter(x=>x!==svc)}}));
  const removeGroup=(group)=>setState(s=>({...s,settings:{...s.settings,assignmentGroups:s.settings.assignmentGroups.filter(x=>x!==group)}}));
  const updateSla=(priority,key,value)=>setState(s=>({...s,settings:{...s.settings,slaPolicy:{...s.settings.slaPolicy,[priority]:{...s.settings.slaPolicy[priority],[key]:Math.max(1,Number(value||1))}}}}));
  return(
    <div style={{padding:"20px 28px",overflowY:"auto",height:"100%",maxWidth:920}}>
      <div className="ui-title" style={{fontSize:22,fontWeight:700,color:t.text}}>Settings</div>
      <div className="ui-copy" style={{fontSize:13,color:t.textMuted,marginTop:4,marginBottom:20}}>Theme, operator defaults, SLA policy, queues, and data portability.</div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div className="ui-section" style={{fontSize:12,marginBottom:12,color:t.text}}>Appearance & Operator</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
          <div><Label t={t}>Theme</Label><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{Object.entries(THEMES).map(([k,v])=><button key={k} onClick={()=>setState(s=>({...s,settings:{...s.settings,theme:k}}))} style={{padding:"8px 16px",borderRadius:8,border:`2px solid ${state.settings.theme===k?t.accent:t.cardBorder}`,background:v.bg,color:v.text,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600}}>{v.name}</button>)}</div></div>
          <div><Label t={t}>Operator Name</Label><Input t={t} value={state.settings.operatorName||""} onChange={e=>setState(s=>({...s,settings:{...s.settings,operatorName:e.target.value}}))} placeholder="Used for My Open Tickets"/></div>
        </div>
      </div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div className="ui-section" style={{fontSize:12,marginBottom:12,color:t.text}}>SLA Policy (hours from ticket creation)</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,minmax(120px,1fr))",gap:12}}>{PRIORITIES.map(priority=><div key={priority} style={{background:t.bg,border:`1px solid ${t.cardBorder}`,borderRadius:10,padding:12}}><div style={{marginBottom:8}}><PriorityPill p={priority} theme={t}/></div><Label t={t}>Response</Label><Input t={t} type="number" min="1" value={state.settings.slaPolicy[priority].responseHours} onChange={e=>updateSla(priority,"responseHours",e.target.value)}/><Label t={t}>Resolution</Label><Input t={t} type="number" min="1" value={state.settings.slaPolicy[priority].resolutionHours} onChange={e=>updateSla(priority,"resolutionHours",e.target.value)}/></div>)}</div>
      </div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div className="ui-section" style={{fontSize:12,marginBottom:12,color:t.text}}>Data: Export / Import</div>
        <div className="ui-helper" style={{color:t.textMuted,marginBottom:14,lineHeight:1.6}}>JSON preserves incidents, requests, problems, changes, SLA metadata, linked ticket references, evidence links, activity logs, and saved views. CSV exports a flat reporting snapshot.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <Btn t={t} onClick={exportJson}>⬇ Export JSON</Btn>
          <Btn t={t} variant="ghost" onClick={exportCsv}>⇩ Export CSV</Btn>
          <Btn t={t} variant="ghost" onClick={()=>fileRef.current?.click()}>⬆ Import (Replace)</Btn>
          <Btn t={t} variant="ghost" onClick={()=>document.getElementById("merge-input").click()}>⥅ Import (Merge)</Btn>
          <input ref={fileRef} type="file" accept=".json,application/json" onChange={importJson} style={{display:"none"}}/>
          <input id="merge-input" type="file" accept=".json,application/json" onChange={mergeImport} style={{display:"none"}}/>
        </div>
        <div className="divider-h" style={{background:t.divider}}/>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <Btn t={t} variant="ghost" onClick={resetSeed}>↺ Load sample data</Btn>
          <Btn t={t} variant="danger" onClick={clearAll}>🗑 Clear all data</Btn>
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16}}>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div className="ui-section" style={{fontSize:12,marginBottom:12,color:t.text}}>Services Catalog</div>
          <div style={{display:"flex",gap:8,marginBottom:12}}><Input t={t} value={newService} onChange={e=>setNewService(e.target.value)} placeholder="Add a service..." onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addService();}}}/><Btn t={t} onClick={addService}>Add</Btn></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{state.settings.services.map(svc=><span key={svc} className="pill" style={{background:t.badge,color:t.text,border:`1px solid ${t.cardBorder}`,padding:"4px 10px",fontSize:12}}>{svc}<button onClick={()=>removeService(svc)} style={{background:"none",border:"none",cursor:"pointer",color:t.textFaint,marginLeft:6,fontSize:13}}>✕</button></span>)}</div>
        </div>

        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div className="ui-section" style={{fontSize:12,marginBottom:12,color:t.text}}>Assignment Groups</div>
          <div style={{display:"flex",gap:8,marginBottom:12}}><Input t={t} value={newGroup} onChange={e=>setNewGroup(e.target.value)} placeholder="Add an assignment group..." onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addGroup();}}}/><Btn t={t} onClick={addGroup}>Add</Btn></div>
          <div style={{display:"flex",flexWrap:"wrap",gap:6}}>{state.settings.assignmentGroups.map(group=><span key={group} className="pill" style={{background:t.badge,color:t.text,border:`1px solid ${t.cardBorder}`,padding:"4px 10px",fontSize:12}}>{group}<button onClick={()=>removeGroup(group)} style={{background:"none",border:"none",cursor:"pointer",color:t.textFaint,marginLeft:6,fontSize:13}}>✕</button></span>)}</div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
function App(){
  const [state,setState]=useState(loadState);
  const [view,setView]=useState("dashboard");
  const [viewPreset,setViewPreset]=useState({incident:"all",request:"all",problem:"all",change:"all"});
  const [editing,setEditing]=useState(null);
  const [toast,setToast]=useState(null);

  useEffect(()=>{saveState(state);},[state]);
  useEffect(()=>{if(!toast)return;const timer=setTimeout(()=>setToast(null),2800);return()=>clearTimeout(timer);},[toast]);
  const theme=THEMES[state.settings.theme]||THEMES.softdark;
  const t=theme;

  const openRecord=(rec)=>setEditing(normalizeRecord(rec,state.settings));
  const newRecord=(type)=>{const map={incident:emptyIncident,request:emptyRequest,problem:emptyProblem,change:emptyChange};setEditing(map[type](state.settings));};
  const openQueue=(type,preset)=>{setViewPreset(v=>({...v,[type]:preset||"all"}));setView(type);};
  const saveView=(type,filters)=>{const name=prompt("Saved view name:");if(!name)return;setState(s=>({...s,settings:{...s.settings,savedViews:[...(s.settings.savedViews||[]),{id:newId(),name:name.trim(),type,filters:copyFilters(filters)}]}}));setToast(`Saved view "${name.trim()}"`);};
  const deleteView=(type,name)=>{setState(s=>({...s,settings:{...s.settings,savedViews:(s.settings.savedViews||[]).filter(view=>!(view.type===type&&view.name===name))}}));setToast(`Deleted view "${name}"`);};

  const saveRecord=(rec)=>{
    setState(s=>{
      const settings=s.settings;const type=rec.type;const cfg=getTypeConfig(type);const list=s[cfg.arrayKey];const existingIdx=list.findIndex(x=>x.id===rec.id);const previous=existingIdx===-1?null:list[existingIdx];let finalRec=normalizeRecord(rec,settings);let nextSettings=settings;
      if(existingIdx===-1&&!finalRec.ticketNo){const cKey=COUNTER_KEYS[type];finalRec.ticketNo=`${cfg.prefix}${padNum(settings[cKey])}`;nextSettings={...settings,[cKey]:(settings[cKey]||1)+1};finalRec.activityLog=[...(finalRec.activityLog||[]),makeActivity("created",`Created ${finalRec.ticketNo}`)];}
      else if(previous){
        const changes=[];
        if(isMeaningfulChange(previous.status,finalRec.status))changes.push(makeActivity("status_change",`Status: ${previous.status} → ${finalRec.status}`));
        if(isMeaningfulChange(previous.priority,finalRec.priority))changes.push(makeActivity("priority_change",`Priority: ${previous.priority} → ${finalRec.priority}`));
        if(isMeaningfulChange(previous.assignee,finalRec.assignee))changes.push(makeActivity("assignee_change",`Assignee: ${previous.assignee||"—"} → ${finalRec.assignee||"—"}`));
        if(isMeaningfulChange(previous.assignmentGroup,finalRec.assignmentGroup))changes.push(makeActivity("assignment_group_change",`Assignment group: ${previous.assignmentGroup||"—"} → ${finalRec.assignmentGroup||"—"}`));
        if(isMeaningfulChange(previous.pendingReason,finalRec.pendingReason)&&finalRec.pendingReason)changes.push(makeActivity("hold_reason","On Hold reason updated"));
        if(isMeaningfulChange(previous.responseDueAt,finalRec.responseDueAt)||isMeaningfulChange(previous.resolutionDueAt,finalRec.resolutionDueAt))changes.push(makeActivity("sla_update","SLA targets updated"));
        if((finalRec.evidence||[]).length!==(previous.evidence||[]).length)changes.push(makeActivity("evidence_update","Evidence links updated"));
        if((finalRec.linkedTickets||[]).join("|")!==(previous.linkedTickets||[]).join("|"))changes.push(makeActivity("ticket_links","Linked tickets updated"));
        if(changes.length)finalRec.activityLog=[...(finalRec.activityLog||[]),...changes];
      }
      const newList=existingIdx===-1?[...list,finalRec]:list.map((x,i)=>i===existingIdx?finalRec:x);
      return {...s,[cfg.arrayKey]:newList,settings:nextSettings};
    });
    setEditing(null);
    setToast(rec.ticketNo?`Saved ${rec.ticketNo}`:"Ticket created");
  };

  const deleteRecord=(rec)=>{setState(s=>({...s,[getTypeConfig(rec.type).arrayKey]:(s[getTypeConfig(rec.type).arrayKey]||[]).filter(x=>x.id!==rec.id)}));setEditing(null);setToast(`Deleted ${rec.ticketNo}`);};

  useEffect(()=>{
    const h=(e)=>{
      if(editing)return;
      if(["INPUT","TEXTAREA","SELECT"].includes(e.target.tagName))return;
      if(e.key==="i"||e.key==="I"){e.preventDefault();newRecord("incident");}
      else if(e.key==="r"||e.key==="R"){e.preventDefault();newRecord("request");}
      else if(e.key==="p"||e.key==="P"){e.preventDefault();newRecord("problem");}
      else if(e.key==="c"||e.key==="C"){e.preventDefault();newRecord("change");}
      else if(e.key==="d"||e.key==="D"||e.key==="1"){e.preventDefault();setView("dashboard");}
      else if(e.key==="2"){e.preventDefault();setView("incident");}
      else if(e.key==="3"){e.preventDefault();setView("request");}
      else if(e.key==="4"){e.preventDefault();setView("problem");}
      else if(e.key==="5"){e.preventDefault();setView("change");}
    };
    document.addEventListener("keydown",h);
    return()=>document.removeEventListener("keydown",h);
  },[editing,state.settings]);

  const counts=ORDERED_TYPES.reduce((acc,type)=>{acc[type]=(state[getTypeConfig(type).arrayKey]||[]).filter(isOpenRecord).length;return acc;},{});
  const SideBtn=({id,icon,label,badge})=><button className="side-btn" onClick={()=>setView(id)} style={{background:view===id?t.hover:"transparent",color:view===id?t.text:t.textMuted,fontWeight:view===id?600:500}}><span className="ico">{icon}</span><span style={{flex:1}}>{label}</span>{badge>0&&<span className="pill" style={{background:t.accent,color:t.accentText,fontSize:10,padding:"1px 7px"}}>{badge}</span>}</button>;

  return(
    <div className="app-shell" style={{display:"flex",height:"100vh",background:t.bg,color:t.text}}>
      <aside className="sidebar-shell" style={{width:248,background:t.sidebar,borderRight:`1px solid ${t.cardBorder}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"18px 18px 12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${t.accent},${t.p2Text})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:18,fontWeight:800}}>IT</div>
            <div><div className="ui-title" style={{fontSize:15,fontWeight:700,color:t.text,lineHeight:1.1}}>ITSM Register</div><div className="ui-section" style={{fontSize:9,color:t.textFaint,marginTop:4}}>Inc / Req / Prb / Chg</div></div>
          </div>
        </div>
        <div style={{padding:"0 10px",display:"flex",flexDirection:"column",gap:2}}>
          <SideBtn id="dashboard" icon="◉" label="Dashboard"/>
          <SideBtn id="incident" icon="⚠" label="Incidents" badge={counts.incident}/>
          <SideBtn id="request" icon="⊕" label="Service Requests" badge={counts.request}/>
          <SideBtn id="problem" icon="◈" label="Problems" badge={counts.problem}/>
          <SideBtn id="change" icon="⟳" label="Changes" badge={counts.change}/>
          <SideBtn id="settings" icon="⚙" label="Settings"/>
        </div>
        <div style={{marginTop:"auto",padding:"14px 14px 16px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Btn t={t} onClick={()=>newRecord("incident")} style={{width:"100%",justifyContent:"center"}}>+ Raise Incident</Btn>
            <Btn t={t} variant="ghost" onClick={()=>newRecord("request")} style={{width:"100%",justifyContent:"center"}}>+ New Request</Btn>
            <Btn t={t} variant="ghost" onClick={()=>newRecord("problem")} style={{width:"100%",justifyContent:"center"}}>+ New Problem</Btn>
            <Btn t={t} variant="ghost" onClick={()=>newRecord("change")} style={{width:"100%",justifyContent:"center"}}>+ New Change</Btn>
          </div>
          <div className="ui-helper" style={{fontSize:10,color:t.textFaint,marginTop:14,lineHeight:1.7,textAlign:"center"}}>
            Operator: <b style={{color:t.text}}>{state.settings.operatorName||"—"}</b><br/>
            Shortcuts: <span className="kbd" style={{background:t.badge,color:t.badgeText}}>I</span> inc · <span className="kbd" style={{background:t.badge,color:t.badgeText}}>R</span> req · <span className="kbd" style={{background:t.badge,color:t.badgeText}}>P</span> prb · <span className="kbd" style={{background:t.badge,color:t.badgeText}}>C</span> chg
          </div>
        </div>
      </aside>

      <main className="main-shell" style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {view==="dashboard"&&<Dashboard state={state} theme={t} onOpen={openRecord} onOpenQueue={openQueue}/>}
        {ORDERED_TYPES.map(type=>view===type&&<Register key={type} records={state[getTypeConfig(type).arrayKey]} type={type} theme={t} onOpen={openRecord} onNew={()=>newRecord(type)} settings={state.settings} presetKey={viewPreset[type]} onSaveView={saveView} onDeleteView={deleteView}/>)}
        {view==="settings"&&<Settings state={state} setState={setState} theme={t} setToast={setToast}/>}
      </main>

      {editing&&<Drawer record={editing} onClose={()=>setEditing(null)} onSave={saveRecord} onDelete={deleteRecord} theme={t} settings={state.settings}/>}
      {toast&&<div className="toast" style={{background:t.accent,color:t.accentText}}>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
