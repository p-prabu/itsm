const {useState,useEffect,useRef,useMemo,useCallback}=React;

// ── THEMES ───────────────────────────────────────────────────────────────────
const THEMES={
  light:{name:"Light",bg:"#f8f7f4",sidebar:"#ffffff",card:"#ffffff",cardBorder:"#e8e6e0",
    text:"#1a1916",textMuted:"#6b6860",textFaint:"#a8a49c",accent:"#2b6cc0",accentText:"#ffffff",
    inputBg:"#ffffff",inputBorder:"#d8d5ce",hover:"#f2f0ea",divider:"#ece9e2",
    badge:"#f0ede6",badgeText:"#6b6860",
    p1Bg:"#fee2e2",p1Text:"#991b1b",p1Border:"#fca5a5",
    p2Bg:"#ffedd5",p2Text:"#9a3412",p2Border:"#fdba74",
    p3Bg:"#fef3c7",p3Text:"#854d0e",p3Border:"#fcd34d",
    p4Bg:"#dcfce7",p4Text:"#14532d",p4Border:"#86efac",
    stNew:"#dbeafe",stNewText:"#1e40af",
    stOpen:"#fef3c7",stOpenText:"#854d0e",
    stProg:"#e9d5ff",stProgText:"#6b21a8",
    stHold:"#e5e7eb",stHoldText:"#374151",
    stDone:"#dcfce7",stDoneText:"#166534",
    stClosed:"#f3f4f6",stClosedText:"#6b7280",
    dpBg:"#ffffff",dpText:"#1a1916",dpMuted:"#a8a49c"},
  dark:{name:"Dark",bg:"#0b0b0c",sidebar:"#111113",card:"#17171a",cardBorder:"#24242a",
    text:"#f0ede6",textMuted:"#8a8680",textFaint:"#55524c",accent:"#4a8fe0",accentText:"#ffffff",
    inputBg:"#1a1a1d",inputBorder:"#2a2a30",hover:"#1d1d22",divider:"#1f1f24",
    badge:"#1a1a1d",badgeText:"#8a8680",
    p1Bg:"#3a1515",p1Text:"#fca5a5",p1Border:"#7f2020",
    p2Bg:"#3a2210",p2Text:"#fdba74",p2Border:"#7f4a1a",
    p3Bg:"#3a2f10",p3Text:"#fcd34d",p3Border:"#7f6820",
    p4Bg:"#0f3520",p4Text:"#86efac",p4Border:"#1a6030",
    stNew:"#132449",stNewText:"#93c5fd",
    stOpen:"#2f2510",stOpenText:"#fcd34d",
    stProg:"#2a1a3a",stProgText:"#c4b5fd",
    stHold:"#1f1f24",stHoldText:"#9ca3af",
    stDone:"#0f2e1e",stDoneText:"#86efac",
    stClosed:"#1a1a1d",stClosedText:"#6b6860",
    dpBg:"#1a1a1d",dpText:"#f0ede6",dpMuted:"#55524c"},
  softdark:{name:"Soft Dark",bg:"#1e1e2a",sidebar:"#252534",card:"#2a2a3a",cardBorder:"#353548",
    text:"#e8e6f0",textMuted:"#9896a8",textFaint:"#5e5c70",accent:"#7c6af0",accentText:"#ffffff",
    inputBg:"#2a2a3a",inputBorder:"#3a3a50",hover:"#323244",divider:"#303044",
    badge:"#323244",badgeText:"#9896a8",
    p1Bg:"#3a1530",p1Text:"#fda4af",p1Border:"#7a2550",
    p2Bg:"#3a2818",p2Text:"#fdba74",p2Border:"#7a4a28",
    p3Bg:"#3a3218",p3Text:"#fde68a",p3Border:"#7a6830",
    p4Bg:"#18382a",p4Text:"#86efac",p4Border:"#2a6048",
    stNew:"#1f2a48",stNewText:"#93c5fd",
    stOpen:"#3a3218",stOpenText:"#fcd34d",
    stProg:"#2e2048",stProgText:"#c4b5fd",
    stHold:"#303044",stHoldText:"#9896a8",
    stDone:"#18382a",stDoneText:"#86efac",
    stClosed:"#252534",stClosedText:"#5e5c70",
    dpBg:"#2a2a3a",dpText:"#e8e6f0",dpMuted:"#5e5c70"},
};

// ── ITIL CONSTANTS ───────────────────────────────────────────────────────────
const INC_CATEGORIES=["Hardware","Software","Network","Access / Account","Security","Email","Performance","Data","Facilities","Other"];
const REQ_CATEGORIES=["Access Request","New Hardware","New Software","Software License","Information Request","Configuration Change","New Employee Setup","Other"];
const IMPACT_LEVELS=["High","Medium","Low"];
const URGENCY_LEVELS=["High","Medium","Low"];
const PRIORITY_MATRIX={
  "High|High":"P1","High|Medium":"P1","High|Low":"P2",
  "Medium|High":"P2","Medium|Medium":"P2","Medium|Low":"P3",
  "Low|High":"P3","Low|Medium":"P3","Low|Low":"P4",
};
const PRIORITIES=["P1","P2","P3","P4"];
const PRIORITY_LABEL={P1:"P1 · Critical",P2:"P2 · High",P3:"P3 · Medium",P4:"P4 · Low"};
const INC_STATUSES=["New","Assigned","In Progress","On Hold","Resolved","Closed","Cancelled"];
const REQ_STATUSES=["New","Pending Approval","Approved","In Progress","On Hold","Fulfilled","Rejected","Closed"];
const REQ_TYPES=["Access","Hardware","Software","Information","Change","Other"];
const DEFAULT_SERVICES=["Email","VPN","SharePoint","Teams","Active Directory","Internet","Printers","CRM","ERP","Laptop / Desktop","Mobile Device","Other"];

// ── HELPERS ──────────────────────────────────────────────────────────────────
const nowIso=()=>new Date().toISOString();
const todayStr=()=>new Date().toISOString().split("T")[0];
const fmtDate=(d)=>{if(!d)return"—";const dt=new Date(d);return dt.toLocaleDateString("en-GB",{day:"2-digit",month:"short",year:"numeric"});};
const fmtDateTime=(d)=>{if(!d)return"—";const dt=new Date(d);return dt.toLocaleString("en-GB",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});};
const calcPriority=(impact,urgency)=>PRIORITY_MATRIX[`${impact}|${urgency}`]||"P3";
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,5);
const padNum=(n,len=5)=>String(n).padStart(len,"0");
const STORAGE_KEY="itsm-register-v1";

const emptyIncident=()=>({
  id:newId(),ticketNo:"",type:"incident",
  title:"",description:"",
  category:"Hardware",service:"Email",
  impact:"Medium",urgency:"Medium",priority:"P3",
  status:"New",
  reporter:"",assignee:"",
  resolution:"",
  createdAt:nowIso(),updatedAt:nowIso(),resolvedAt:null,closedAt:null,
  workNotes:[],
});
const emptyRequest=()=>({
  id:newId(),ticketNo:"",type:"request",
  title:"",description:"",
  requestType:"Access",category:"Access Request",service:"Email",
  impact:"Low",urgency:"Low",priority:"P4",
  status:"New",
  requester:"",assignee:"",approver:"",
  fulfillmentNotes:"",
  createdAt:nowIso(),updatedAt:nowIso(),fulfilledAt:null,closedAt:null,
  workNotes:[],
});

// ── SAMPLE SEED ──────────────────────────────────────────────────────────────
const seed=()=>{
  const now=Date.now();
  const d=(offDays)=>new Date(now-offDays*86400000).toISOString();
  return{
    incidents:[
      {...emptyIncident(),ticketNo:"INC00001",title:"Email not syncing on mobile",description:"Outlook mobile client stopped syncing mail after the 06:00 patch window. Desktop still works.",category:"Email",service:"Email",impact:"Medium",urgency:"High",priority:"P2",status:"In Progress",reporter:"Priya S.",assignee:"Help Desk L2",createdAt:d(1),updatedAt:d(0),workNotes:[{at:d(0),by:"Help Desk L2",note:"Reproduced on iOS; escalating to messaging team."}]},
      {...emptyIncident(),ticketNo:"INC00002",title:"VPN disconnects every 10 minutes",description:"Users in Chennai office report VPN tunnel drops. Roughly every 10 min.",category:"Network",service:"VPN",impact:"High",urgency:"High",priority:"P1",status:"Assigned",reporter:"Karthik R.",assignee:"Network Team",createdAt:d(0),updatedAt:d(0)},
      {...emptyIncident(),ticketNo:"INC00003",title:"Printer jammed — Floor 3",description:"HP LaserJet on floor 3 jammed; paper stuck in feeder.",category:"Hardware",service:"Printers",impact:"Low",urgency:"Low",priority:"P4",status:"Resolved",reporter:"Anita D.",assignee:"Facilities",resolution:"Cleared jam and ran cleaning cycle. Verified 5 test pages.",createdAt:d(3),updatedAt:d(2),resolvedAt:d(2)},
    ],
    requests:[
      {...emptyRequest(),ticketNo:"REQ00001",title:"Access to SharePoint Finance site",description:"Need read/write access to the Finance SharePoint site for quarter close.",requestType:"Access",category:"Access Request",service:"SharePoint",impact:"Low",urgency:"Medium",priority:"P3",status:"Pending Approval",requester:"Prabu P.",approver:"Finance Manager",createdAt:d(0),updatedAt:d(0)},
      {...emptyRequest(),ticketNo:"REQ00002",title:"New laptop for joiner — 1 May",description:"Standard developer laptop for new hire starting 1 May. 16GB RAM, Windows 11.",requestType:"Hardware",category:"New Employee Setup",service:"Laptop / Desktop",impact:"Medium",urgency:"Medium",priority:"P2",status:"Approved",requester:"HR",assignee:"IT Procurement",approver:"IT Manager",createdAt:d(5),updatedAt:d(1)},
      {...emptyRequest(),ticketNo:"REQ00003",title:"Install Visio on workstation",description:"Need Microsoft Visio installed for architecture diagrams.",requestType:"Software",category:"New Software",service:"Laptop / Desktop",impact:"Low",urgency:"Low",priority:"P4",status:"Fulfilled",requester:"Meera J.",assignee:"Help Desk L1",createdAt:d(7),updatedAt:d(6),fulfilledAt:d(6),fulfillmentNotes:"Installed Visio Professional 2021. Licence assigned."},
    ],
    settings:{theme:"light",services:DEFAULT_SERVICES,incCounter:4,reqCounter:4},
  };
};

// ── STATE I/O ────────────────────────────────────────────────────────────────
function loadState(){
  try{
    const raw=localStorage.getItem(STORAGE_KEY);
    if(!raw)return seed();
    const p=JSON.parse(raw);
    return{
      incidents:p.incidents||[],
      requests:p.requests||[],
      settings:{theme:"light",services:DEFAULT_SERVICES,incCounter:1,reqCounter:1,...(p.settings||{})},
    };
  }catch(e){console.warn("loadState failed",e);return seed();}
}
function saveState(s){try{localStorage.setItem(STORAGE_KEY,JSON.stringify(s));}catch(e){console.warn("saveState failed",e);}}

// ── PILL RENDERERS ───────────────────────────────────────────────────────────
function PriorityPill({p,theme}){
  const t=theme;
  const m={P1:{bg:t.p1Bg,text:t.p1Text,border:t.p1Border,dot:"●"},
           P2:{bg:t.p2Bg,text:t.p2Text,border:t.p2Border,dot:"●"},
           P3:{bg:t.p3Bg,text:t.p3Text,border:t.p3Border,dot:"●"},
           P4:{bg:t.p4Bg,text:t.p4Text,border:t.p4Border,dot:"●"}}[p]||{bg:t.badge,text:t.badgeText,border:t.cardBorder,dot:"●"};
  return <span className="pill" style={{background:m.bg,color:m.text,border:`1px solid ${m.border}`}}>{m.dot} {p}</span>;
}
function StatusPill({s,theme}){
  const t=theme;
  const map={
    "New":[t.stNew,t.stNewText],
    "Assigned":[t.stNew,t.stNewText],
    "Pending Approval":[t.stOpen,t.stOpenText],
    "Approved":[t.stProg,t.stProgText],
    "In Progress":[t.stProg,t.stProgText],
    "On Hold":[t.stHold,t.stHoldText],
    "Resolved":[t.stDone,t.stDoneText],
    "Fulfilled":[t.stDone,t.stDoneText],
    "Rejected":[t.p1Bg,t.p1Text],
    "Cancelled":[t.stHold,t.stHoldText],
    "Closed":[t.stClosed,t.stClosedText],
  };
  const [bg,color]=map[s]||[t.badge,t.badgeText];
  return <span className="pill" style={{background:bg,color}}>{s}</span>;
}

// ── DATE PICKER (simple) ─────────────────────────────────────────────────────
function DatePicker({value,onChange,theme,placeholder="Pick a date..."}){
  const t=theme;
  const [open,setOpen]=useState(false);
  const [vd,setVd]=useState(()=>value?new Date(value+"T00:00:00"):new Date());
  const tr=useRef(),pop=useRef();
  const [pos,setPos]=useState({top:0,left:0});
  useEffect(()=>{if(open&&tr.current){const r=tr.current.getBoundingClientRect();setPos({top:r.bottom+6,left:r.left});}},[open]);
  useEffect(()=>{const h=(e)=>{if(tr.current&&!tr.current.contains(e.target)&&pop.current&&!pop.current.contains(e.target))setOpen(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  const yr=vd.getFullYear(),mo=vd.getMonth();
  const firstDay=new Date(yr,mo,1).getDay();
  const nDays=new Date(yr,mo+1,0).getDate();
  const pad=(firstDay+6)%7;
  const cells=[];for(let i=0;i<pad;i++)cells.push(null);for(let i=1;i<=nDays;i++)cells.push(i);
  const today=todayStr();
  const pick=(d)=>{const ds=`${yr}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;onChange(ds);setOpen(false);};
  return(
    <div className="date-wrap">
      <div ref={tr} onClick={()=>setOpen(o=>!o)} style={{display:"flex",alignItems:"center",gap:8,padding:"9px 12px",borderRadius:8,border:`1.5px solid ${open?t.accent:t.inputBorder}`,background:t.inputBg,color:value?t.text:t.textFaint,fontSize:13,cursor:"pointer",userSelect:"none"}}>
        <span style={{fontSize:14}}>📅</span>
        <span style={{flex:1}}>{value?fmtDate(value):placeholder}</span>
        {value&&<span onClick={e=>{e.stopPropagation();onChange("");setOpen(false);}} style={{color:t.textFaint,fontSize:12,padding:"0 4px"}}>✕</span>}
        <span style={{color:t.textFaint,fontSize:10}}>▾</span>
      </div>
      {open&&(
        <div ref={pop} className="date-pop fade-in" style={{top:pos.top,left:pos.left,background:t.dpBg,border:`1px solid ${t.inputBorder}`}}>
          <div className="dp-nav">
            <button onClick={()=>setVd(d=>new Date(d.getFullYear(),d.getMonth()-1,1))} style={{background:"none",border:`1px solid ${t.inputBorder}`,borderRadius:6,cursor:"pointer",color:t.dpText,padding:"4px 10px"}}>◀</button>
            <span style={{fontWeight:700,fontSize:14,color:t.dpText}}>{vd.toLocaleDateString("en-GB",{month:"long",year:"numeric"})}</span>
            <button onClick={()=>setVd(d=>new Date(d.getFullYear(),d.getMonth()+1,1))} style={{background:"none",border:`1px solid ${t.inputBorder}`,borderRadius:6,cursor:"pointer",color:t.dpText,padding:"4px 10px"}}>▶</button>
          </div>
          <div className="dp-hdr">{["Mo","Tu","We","Th","Fr","Sa","Su"].map(d=><div key={d} className="dp-hdr-cell" style={{color:t.dpMuted}}>{d}</div>)}</div>
          <div className="dp-grid">
            {cells.map((d,i)=>{if(!d)return<div key={`e${i}`}/>;const ds=`${yr}-${String(mo+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;const isTod=ds===today,isSel=ds===value;return<div key={d} className="dp-day" style={{color:isSel?"#fff":isTod?t.accent:t.dpText,background:isSel?t.accent:isTod?`${t.accent}20`:"transparent",fontWeight:isTod||isSel?700:500}} onClick={()=>pick(d)}>{d}</div>;})}
          </div>
        </div>
      )}
    </div>
  );
}

// ── INPUT PRIMITIVES ─────────────────────────────────────────────────────────
function Input({t,...p}){return <input className="input" style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}} {...p}/>;}
function Textarea({t,...p}){return <textarea className="textarea" style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}} {...p}/>;}
function Select({t,options,value,onChange,...p}){return(<select className="select" value={value} onChange={onChange} style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text}} {...p}>{options.map(o=>typeof o==="string"?<option key={o} value={o}>{o}</option>:<option key={o.value} value={o.value}>{o.label}</option>)}</select>);}
function Label({t,children}){return <div className="label" style={{color:t.textMuted}}>{children}</div>;}
function Btn({t,variant="primary",children,...p}){
  const styles=variant==="primary"?{background:t.accent,color:t.accentText}
    :variant==="ghost"?{background:"transparent",color:t.text,border:`1.5px solid ${t.cardBorder}`}
    :variant==="danger"?{background:t.p1Bg,color:t.p1Text,border:`1.5px solid ${t.p1Border}`}
    :{background:t.hover,color:t.text};
  return <button className="btn" style={styles} {...p}>{children}</button>;
}

// ── DRAWER (record detail form) ──────────────────────────────────────────────
function Drawer({record,onClose,onSave,onDelete,theme,services}){
  const t=theme;
  const [r,setR]=useState(()=>({...record}));
  const [newNote,setNewNote]=useState("");
  const isInc=r.type==="incident";
  const isNew=!record.ticketNo;

  useEffect(()=>{
    if(r.impact&&r.urgency){
      const p=calcPriority(r.impact,r.urgency);
      if(p!==r.priority)setR(x=>({...x,priority:p}));
    }
  },[r.impact,r.urgency]);

  const updateField=(k,v)=>setR(x=>({...x,[k]:v}));
  const addNote=()=>{
    if(!newNote.trim())return;
    const n={at:nowIso(),by:(isInc?r.assignee:r.assignee)||"Unassigned",note:newNote.trim()};
    setR(x=>({...x,workNotes:[...(x.workNotes||[]),n]}));
    setNewNote("");
  };
  const submit=(e)=>{
    e.preventDefault();
    if(!r.title.trim()){alert("Title is required");return;}
    const updated={...r,updatedAt:nowIso()};
    if(isInc){
      if(r.status==="Resolved"&&!r.resolvedAt)updated.resolvedAt=nowIso();
      if(r.status==="Closed"&&!r.closedAt)updated.closedAt=nowIso();
    }else{
      if(r.status==="Fulfilled"&&!r.fulfilledAt)updated.fulfilledAt=nowIso();
      if(r.status==="Closed"&&!r.closedAt)updated.closedAt=nowIso();
    }
    onSave(updated);
  };

  const esc=useCallback((e)=>{if(e.key==="Escape")onClose();},[onClose]);
  useEffect(()=>{document.addEventListener("keydown",esc);return()=>document.removeEventListener("keydown",esc);},[esc]);

  return(
    <>
      <div className="drawer-overlay" onClick={onClose}/>
      <form className="drawer" onSubmit={submit} style={{background:t.card,color:t.text}}>
        <div style={{padding:"18px 22px",borderBottom:`1px solid ${t.cardBorder}`,display:"flex",alignItems:"center",justifyContent:"space-between",flexShrink:0}}>
          <div>
            <div style={{fontSize:11,fontWeight:700,letterSpacing:0.7,textTransform:"uppercase",color:t.textMuted}}>
              {isInc?"⚠ Incident":"⊕ Service Request"}{r.ticketNo?` · ${r.ticketNo}`:" · New"}
            </div>
            <div style={{fontSize:18,fontWeight:700,marginTop:2}}>{isNew?(isInc?"Raise incident":"Submit request"):"Edit ticket"}</div>
          </div>
          <button type="button" onClick={onClose} style={{background:"none",border:"none",cursor:"pointer",color:t.textMuted,fontSize:22,padding:4}}>✕</button>
        </div>

        <div style={{flex:1,overflowY:"auto",padding:"18px 22px"}}>
          <div style={{display:"grid",gap:14}}>
            <div>
              <Label t={t}>Title / Summary *</Label>
              <Input t={t} value={r.title} onChange={e=>updateField("title",e.target.value)} placeholder={isInc?"Short description of what's broken":"What do you need?"} autoFocus/>
            </div>
            <div>
              <Label t={t}>Description</Label>
              <Textarea t={t} value={r.description} onChange={e=>updateField("description",e.target.value)} placeholder={isInc?"What were you trying to do? What happened? Error messages? Steps to reproduce?":"Describe the request in detail. Why is it needed?"}/>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <Label t={t}>Category</Label>
                <Select t={t} value={r.category} onChange={e=>updateField("category",e.target.value)} options={isInc?INC_CATEGORIES:REQ_CATEGORIES}/>
              </div>
              <div>
                <Label t={t}>Affected Service</Label>
                <Select t={t} value={r.service} onChange={e=>updateField("service",e.target.value)} options={services}/>
              </div>
            </div>

            {!isInc&&(
              <div>
                <Label t={t}>Request Type</Label>
                <Select t={t} value={r.requestType} onChange={e=>updateField("requestType",e.target.value)} options={REQ_TYPES}/>
              </div>
            )}

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:12}}>
              <div>
                <Label t={t}>Impact</Label>
                <Select t={t} value={r.impact} onChange={e=>updateField("impact",e.target.value)} options={IMPACT_LEVELS}/>
              </div>
              <div>
                <Label t={t}>Urgency</Label>
                <Select t={t} value={r.urgency} onChange={e=>updateField("urgency",e.target.value)} options={URGENCY_LEVELS}/>
              </div>
              <div>
                <Label t={t}>Priority (auto)</Label>
                <div style={{display:"flex",alignItems:"center",height:38}}>
                  <PriorityPill p={r.priority} theme={t}/>
                </div>
              </div>
            </div>

            <div>
              <Label t={t}>Status</Label>
              <Select t={t} value={r.status} onChange={e=>updateField("status",e.target.value)} options={isInc?INC_STATUSES:REQ_STATUSES}/>
            </div>

            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div>
                <Label t={t}>{isInc?"Reporter":"Requester"}</Label>
                <Input t={t} value={isInc?r.reporter:r.requester} onChange={e=>updateField(isInc?"reporter":"requester",e.target.value)} placeholder="Name"/>
              </div>
              <div>
                <Label t={t}>Assignee</Label>
                <Input t={t} value={r.assignee} onChange={e=>updateField("assignee",e.target.value)} placeholder="Who is working on it"/>
              </div>
            </div>

            {!isInc&&(
              <div>
                <Label t={t}>Approver</Label>
                <Input t={t} value={r.approver||""} onChange={e=>updateField("approver",e.target.value)} placeholder="Approver name"/>
              </div>
            )}

            <div>
              <Label t={t}>{isInc?"Resolution":"Fulfillment Notes"}</Label>
              <Textarea t={t} value={isInc?r.resolution:r.fulfillmentNotes} onChange={e=>updateField(isInc?"resolution":"fulfillmentNotes",e.target.value)} placeholder={isInc?"How was it resolved?":"How was the request fulfilled?"}/>
            </div>

            {!isNew&&(
              <>
                <div className="divider-h" style={{background:t.divider}}/>
                <div>
                  <Label t={t}>Work Notes / Activity</Label>
                  <div style={{display:"flex",gap:8,marginBottom:10}}>
                    <Input t={t} value={newNote} onChange={e=>setNewNote(e.target.value)} placeholder="Add a work note..." onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addNote();}}}/>
                    <Btn t={t} type="button" onClick={addNote}>Add</Btn>
                  </div>
                  {(r.workNotes||[]).slice().reverse().map((n,i)=>(
                    <div key={i} style={{background:t.bg,border:`1px solid ${t.cardBorder}`,borderRadius:8,padding:"8px 12px",marginBottom:6}}>
                      <div style={{fontSize:11,color:t.textMuted,marginBottom:3}}>{fmtDateTime(n.at)} · {n.by||"—"}</div>
                      <div style={{fontSize:13,color:t.text,whiteSpace:"pre-wrap"}}>{n.note}</div>
                    </div>
                  ))}
                  {(!r.workNotes||r.workNotes.length===0)&&<div style={{fontSize:12,color:t.textFaint,fontStyle:"italic"}}>No work notes yet.</div>}
                </div>

                <div className="divider-h" style={{background:t.divider}}/>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,fontSize:12,color:t.textMuted}}>
                  <div><b style={{color:t.text}}>Created:</b><br/>{fmtDateTime(r.createdAt)}</div>
                  <div><b style={{color:t.text}}>Last Updated:</b><br/>{fmtDateTime(r.updatedAt)}</div>
                  {isInc&&r.resolvedAt&&<div><b style={{color:t.text}}>Resolved:</b><br/>{fmtDateTime(r.resolvedAt)}</div>}
                  {!isInc&&r.fulfilledAt&&<div><b style={{color:t.text}}>Fulfilled:</b><br/>{fmtDateTime(r.fulfilledAt)}</div>}
                  {r.closedAt&&<div><b style={{color:t.text}}>Closed:</b><br/>{fmtDateTime(r.closedAt)}</div>}
                </div>
              </>
            )}
          </div>
        </div>

        <div style={{padding:"14px 22px",borderTop:`1px solid ${t.cardBorder}`,display:"flex",gap:10,justifyContent:"space-between",flexShrink:0}}>
          <div>
            {!isNew&&<Btn t={t} variant="danger" type="button" onClick={()=>{if(confirm("Delete this ticket permanently?"))onDelete(r);}}>🗑 Delete</Btn>}
          </div>
          <div style={{display:"flex",gap:10}}>
            <Btn t={t} variant="ghost" type="button" onClick={onClose}>Cancel</Btn>
            <Btn t={t} type="submit">{isNew?(isInc?"Raise Incident":"Submit Request"):"Save Changes"}</Btn>
          </div>
        </div>
      </form>
    </>
  );
}

// ── REGISTER VIEW (table for incidents or requests) ──────────────────────────
function Register({records,type,theme,onOpen,onNew}){
  const t=theme;
  const [q,setQ]=useState("");
  const [statusFilter,setStatusFilter]=useState("All");
  const [priorityFilter,setPriorityFilter]=useState("All");
  const [sortBy,setSortBy]=useState("updatedAt");
  const [sortDir,setSortDir]=useState("desc");

  const statuses=type==="incident"?INC_STATUSES:REQ_STATUSES;

  const filtered=useMemo(()=>{
    let rows=records.filter(r=>r.type===type);
    if(q){const qq=q.toLowerCase();rows=rows.filter(r=>(r.title||"").toLowerCase().includes(qq)||(r.ticketNo||"").toLowerCase().includes(qq)||(r.description||"").toLowerCase().includes(qq)||(r.assignee||"").toLowerCase().includes(qq)||(r.reporter||r.requester||"").toLowerCase().includes(qq));}
    if(statusFilter!=="All")rows=rows.filter(r=>r.status===statusFilter);
    if(priorityFilter!=="All")rows=rows.filter(r=>r.priority===priorityFilter);
    rows.sort((a,b)=>{
      const av=a[sortBy],bv=b[sortBy];
      if(av===bv)return 0;
      const cmp=av<bv?-1:1;
      return sortDir==="asc"?cmp:-cmp;
    });
    return rows;
  },[records,type,q,statusFilter,priorityFilter,sortBy,sortDir]);

  const toggleSort=(col)=>{if(sortBy===col)setSortDir(d=>d==="asc"?"desc":"asc");else{setSortBy(col);setSortDir("desc");}};
  const sortArrow=(col)=>sortBy===col?(sortDir==="asc"?" ▲":" ▼"):"";

  return(
    <div style={{padding:"20px 28px",height:"100%",display:"flex",flexDirection:"column",overflow:"hidden"}}>
      <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:16}}>
        <div>
          <div style={{fontSize:22,fontWeight:700,color:t.text}}>{type==="incident"?"⚠ Incident Register":"⊕ Service Request Register"}</div>
          <div style={{fontSize:13,color:t.textMuted,marginTop:2}}>{type==="incident"?"Report and track things that are broken or not working.":"Request new services, access, hardware, or software."}</div>
        </div>
        <Btn t={t} onClick={onNew}>+ {type==="incident"?"Raise Incident":"New Request"}</Btn>
      </div>

      <div style={{display:"flex",gap:10,marginBottom:14,flexWrap:"wrap",alignItems:"center"}}>
        <div style={{position:"relative",flex:"1 1 260px",minWidth:220}}>
          <span style={{position:"absolute",left:12,top:"50%",transform:"translateY(-50%)",color:t.textFaint,fontSize:14,pointerEvents:"none"}}>🔍</span>
          <Input t={t} value={q} onChange={e=>setQ(e.target.value)} placeholder="Search title, number, description, assignee..." style={{background:t.inputBg,borderColor:t.inputBorder,color:t.text,paddingLeft:34}}/>
        </div>
        <Select t={t} value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} options={["All",...statuses]} style={{width:180,background:t.inputBg,borderColor:t.inputBorder,color:t.text}}/>
        <Select t={t} value={priorityFilter} onChange={e=>setPriorityFilter(e.target.value)} options={["All",...PRIORITIES]} style={{width:130,background:t.inputBg,borderColor:t.inputBorder,color:t.text}}/>
      </div>

      <div style={{flex:1,overflow:"auto",border:`1px solid ${t.cardBorder}`,borderRadius:12,background:t.card}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:13}}>
          <thead style={{position:"sticky",top:0,background:t.card,zIndex:2}}>
            <tr style={{borderBottom:`1px solid ${t.cardBorder}`,textAlign:"left"}}>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted,cursor:"pointer"}} onClick={()=>toggleSort("ticketNo")}>Ticket#{sortArrow("ticketNo")}</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted,cursor:"pointer"}} onClick={()=>toggleSort("title")}>Title{sortArrow("title")}</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted,cursor:"pointer"}} onClick={()=>toggleSort("priority")}>Priority{sortArrow("priority")}</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted,cursor:"pointer"}} onClick={()=>toggleSort("status")}>Status{sortArrow("status")}</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Category</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Service</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>{type==="incident"?"Reporter":"Requester"}</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted}}>Assignee</th>
              <th style={{padding:"12px 14px",fontSize:11,fontWeight:700,letterSpacing:0.5,textTransform:"uppercase",color:t.textMuted,cursor:"pointer"}} onClick={()=>toggleSort("updatedAt")}>Updated{sortArrow("updatedAt")}</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(r=>(
              <tr key={r.id} className="tbl-row" onClick={()=>onOpen(r)} style={{borderBottom:`1px solid ${t.divider}`}}
                  onMouseEnter={e=>e.currentTarget.style.background=t.hover}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <td style={{padding:"11px 14px",color:t.textMuted,fontFamily:"ui-monospace,monospace",fontSize:12}}>{r.ticketNo}</td>
                <td style={{padding:"11px 14px",color:t.text,fontWeight:500,maxWidth:320,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</td>
                <td style={{padding:"11px 14px"}}><PriorityPill p={r.priority} theme={t}/></td>
                <td style={{padding:"11px 14px"}}><StatusPill s={r.status} theme={t}/></td>
                <td style={{padding:"11px 14px",color:t.textMuted}}>{r.category}</td>
                <td style={{padding:"11px 14px",color:t.textMuted}}>{r.service}</td>
                <td style={{padding:"11px 14px",color:t.textMuted}}>{type==="incident"?r.reporter:r.requester||"—"}</td>
                <td style={{padding:"11px 14px",color:t.textMuted}}>{r.assignee||"—"}</td>
                <td style={{padding:"11px 14px",color:t.textMuted,fontSize:12}}>{fmtDate(r.updatedAt)}</td>
              </tr>
            ))}
            {filtered.length===0&&(
              <tr><td colSpan={9} style={{padding:"60px 20px",textAlign:"center",color:t.textFaint}}>
                <div style={{fontSize:40,marginBottom:10,opacity:0.4}}>{type==="incident"?"⚠":"⊕"}</div>
                <div style={{fontSize:14,fontWeight:600,marginBottom:4,color:t.textMuted}}>Nothing to show</div>
                <div style={{fontSize:12}}>No records match the current filters.</div>
              </td></tr>
            )}
          </tbody>
        </table>
      </div>

      <div style={{marginTop:10,fontSize:12,color:t.textFaint,textAlign:"right"}}>{filtered.length} record{filtered.length===1?"":"s"}</div>
    </div>
  );
}

// ── DASHBOARD ────────────────────────────────────────────────────────────────
function Dashboard({state,theme,onOpen,setView}){
  const t=theme;
  const incidents=state.incidents;
  const requests=state.requests;
  const all=[...incidents,...requests];

  const openStatusesInc=["New","Assigned","In Progress","On Hold"];
  const openStatusesReq=["New","Pending Approval","Approved","In Progress","On Hold"];

  const openInc=incidents.filter(r=>openStatusesInc.includes(r.status));
  const openReq=requests.filter(r=>openStatusesReq.includes(r.status));

  const countBy=(rows,key)=>rows.reduce((a,r)=>{a[r[key]]=(a[r[key]]||0)+1;return a;},{});
  const incByPri=countBy(openInc,"priority");
  const reqByPri=countBy(openReq,"priority");
  const incByStatus=countBy(incidents,"status");
  const reqByStatus=countBy(requests,"status");

  const recent=[...all].sort((a,b)=>new Date(b.updatedAt)-new Date(a.updatedAt)).slice(0,10);

  const Stat=({num,label,color,onClick})=>(
    <div className="stat-card" style={{background:t.card,borderColor:t.cardBorder,cursor:onClick?"pointer":"default"}} onClick={onClick}>
      <div className="stat-num" style={{color:color||t.text}}>{num}</div>
      <div className="stat-label" style={{color:t.textMuted}}>{label}</div>
    </div>
  );

  const priColors={P1:t.p1Text,P2:t.p2Text,P3:t.p3Text,P4:t.p4Text};
  const priBgs={P1:t.p1Bg,P2:t.p2Bg,P3:t.p3Bg,P4:t.p4Bg};

  const PriorityBar=({counts,total})=>{
    if(!total)return <div style={{fontSize:12,color:t.textFaint,fontStyle:"italic"}}>No open tickets</div>;
    return(
      <div>
        <div className="bar" style={{background:t.bg,border:`1px solid ${t.cardBorder}`}}>
          {PRIORITIES.map(p=>{const c=counts[p]||0;if(!c)return null;const w=(c/total)*100;return <span key={p} style={{width:`${w}%`,background:priColors[p]}} title={`${p}: ${c}`}/>;})}
        </div>
        <div style={{display:"flex",gap:14,marginTop:10,flexWrap:"wrap"}}>
          {PRIORITIES.map(p=>(
            <div key={p} style={{display:"flex",alignItems:"center",gap:6,fontSize:12,color:t.textMuted}}>
              <span style={{width:10,height:10,borderRadius:3,background:priColors[p],display:"inline-block"}}/>
              <b style={{color:t.text}}>{counts[p]||0}</b> {p}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return(
    <div style={{padding:"20px 28px",overflowY:"auto",height:"100%"}}>
      <div style={{fontSize:22,fontWeight:700,color:t.text}}>Dashboard</div>
      <div style={{fontSize:13,color:t.textMuted,marginTop:2,marginBottom:20}}>ITIL-aligned view of your incident and service request queues.</div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:14,marginBottom:24}}>
        <Stat num={openInc.length} label="Open Incidents" color={t.p1Text} onClick={()=>setView("incidents")}/>
        <Stat num={openReq.length} label="Open Requests" color={t.accent} onClick={()=>setView("requests")}/>
        <Stat num={(incByStatus["Resolved"]||0)+(incByStatus["Closed"]||0)} label="Resolved Incidents" color={t.stDoneText}/>
        <Stat num={(reqByStatus["Fulfilled"]||0)+(reqByStatus["Closed"]||0)} label="Fulfilled Requests" color={t.stDoneText}/>
        <Stat num={incidents.length+requests.length} label="Total Tickets" color={t.text}/>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:20}}>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div style={{fontSize:14,fontWeight:700,color:t.text,marginBottom:12}}>⚠ Open Incidents by Priority</div>
          <PriorityBar counts={incByPri} total={openInc.length}/>
        </div>
        <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
          <div style={{fontSize:14,fontWeight:700,color:t.text,marginBottom:12}}>⊕ Open Requests by Priority</div>
          <PriorityBar counts={reqByPri} total={openReq.length}/>
        </div>
      </div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder}}>
        <div style={{fontSize:14,fontWeight:700,color:t.text,marginBottom:12}}>Recent Activity</div>
        {recent.length===0&&<div style={{fontSize:13,color:t.textFaint,fontStyle:"italic"}}>No tickets yet. Raise an incident or submit a request to get started.</div>}
        {recent.map(r=>(
          <div key={r.id} onClick={()=>onOpen(r)} style={{display:"flex",alignItems:"center",gap:12,padding:"10px 8px",borderRadius:8,cursor:"pointer",borderBottom:`1px solid ${t.divider}`}} onMouseEnter={e=>e.currentTarget.style.background=t.hover} onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
            <span style={{fontSize:16,width:22}}>{r.type==="incident"?"⚠":"⊕"}</span>
            <span style={{fontFamily:"ui-monospace,monospace",fontSize:12,color:t.textMuted,minWidth:80}}>{r.ticketNo}</span>
            <PriorityPill p={r.priority} theme={t}/>
            <span style={{flex:1,fontSize:13,color:t.text,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{r.title}</span>
            <StatusPill s={r.status} theme={t}/>
            <span style={{fontSize:12,color:t.textFaint,minWidth:90,textAlign:"right"}}>{fmtDate(r.updatedAt)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── SETTINGS ─────────────────────────────────────────────────────────────────
function Settings({state,setState,theme,setToast}){
  const t=theme;
  const [newService,setNewService]=useState("");
  const fileRef=useRef();

  const exportJson=()=>{
    const data={...state,exportedAt:nowIso(),version:1};
    const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=`itsm-register-${todayStr()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    setToast("Exported JSON");
  };

  const importJson=(e)=>{
    const f=e.target.files[0];if(!f)return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      try{
        const parsed=JSON.parse(ev.target.result);
        if(!parsed.incidents||!parsed.requests){alert("File is not a valid ITSM export.");return;}
        if(!confirm(`Import ${parsed.incidents.length} incidents and ${parsed.requests.length} requests? This will REPLACE current data.`))return;
        setState({
          incidents:parsed.incidents||[],
          requests:parsed.requests||[],
          settings:{...state.settings,...(parsed.settings||{})},
        });
        setToast("Imported successfully");
      }catch(err){alert("Could not parse JSON: "+err.message);}
    };
    reader.readAsText(f);
    e.target.value="";
  };

  const mergeImport=(e)=>{
    const f=e.target.files[0];if(!f)return;
    const reader=new FileReader();
    reader.onload=(ev)=>{
      try{
        const parsed=JSON.parse(ev.target.result);
        if(!parsed.incidents||!parsed.requests){alert("File is not a valid ITSM export.");return;}
        const existingIds=new Set([...state.incidents,...state.requests].map(r=>r.id));
        const newInc=(parsed.incidents||[]).filter(r=>!existingIds.has(r.id));
        const newReq=(parsed.requests||[]).filter(r=>!existingIds.has(r.id));
        if(!confirm(`Merge in ${newInc.length} new incidents and ${newReq.length} new requests (skipping duplicates)?`))return;
        setState(s=>({...s,incidents:[...s.incidents,...newInc],requests:[...s.requests,...newReq]}));
        setToast(`Merged ${newInc.length+newReq.length} new records`);
      }catch(err){alert("Could not parse JSON: "+err.message);}
    };
    reader.readAsText(f);
    e.target.value="";
  };

  const clearAll=()=>{
    if(!confirm("This will delete ALL incidents and service requests. This cannot be undone. Export first if you want a backup. Continue?"))return;
    if(!confirm("Are you absolutely sure? All data will be lost."))return;
    setState({incidents:[],requests:[],settings:{...state.settings,incCounter:1,reqCounter:1}});
    setToast("All data cleared");
  };

  const resetSeed=()=>{
    if(!confirm("Replace current data with sample seed data?"))return;
    setState(seed());
    setToast("Sample data loaded");
  };

  const addService=()=>{
    const v=newService.trim();if(!v)return;
    if(state.settings.services.includes(v)){setToast("Service already exists");return;}
    setState(s=>({...s,settings:{...s.settings,services:[...s.settings.services,v]}}));
    setNewService("");
  };
  const removeService=(svc)=>{
    setState(s=>({...s,settings:{...s.settings,services:s.settings.services.filter(x=>x!==svc)}}));
  };

  return(
    <div style={{padding:"20px 28px",overflowY:"auto",height:"100%",maxWidth:720}}>
      <div style={{fontSize:22,fontWeight:700,color:t.text}}>Settings</div>
      <div style={{fontSize:13,color:t.textMuted,marginTop:2,marginBottom:20}}>Themes, services, and data import/export.</div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:t.text}}>Appearance</div>
        <Label t={t}>Theme</Label>
        <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
          {Object.entries(THEMES).map(([k,v])=>(
            <button key={k} onClick={()=>setState(s=>({...s,settings:{...s.settings,theme:k}}))} style={{padding:"8px 16px",borderRadius:8,border:`2px solid ${state.settings.theme===k?t.accent:t.cardBorder}`,background:v.bg,color:v.text,cursor:"pointer",fontFamily:"inherit",fontSize:13,fontWeight:600}}>{v.name}</button>
          ))}
        </div>
      </div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:t.text}}>Data: Export / Import</div>
        <div style={{fontSize:12,color:t.textMuted,marginBottom:14,lineHeight:1.6}}>Your data is stored in your browser (localStorage) on this device. Use JSON export to back up, share, or move to another browser.</div>
        <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
          <Btn t={t} onClick={exportJson}>⬇ Export JSON</Btn>
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

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:12,color:t.text}}>Services Catalog</div>
        <div style={{fontSize:12,color:t.textMuted,marginBottom:12}}>Services that tickets can be associated with.</div>
        <div style={{display:"flex",gap:8,marginBottom:12}}>
          <Input t={t} value={newService} onChange={e=>setNewService(e.target.value)} placeholder="Add a service..." onKeyDown={e=>{if(e.key==="Enter"){e.preventDefault();addService();}}}/>
          <Btn t={t} onClick={addService}>Add</Btn>
        </div>
        <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
          {state.settings.services.map(svc=>(
            <span key={svc} className="pill" style={{background:t.badge,color:t.text,border:`1px solid ${t.cardBorder}`,padding:"4px 10px",fontSize:12}}>{svc}<button onClick={()=>removeService(svc)} style={{background:"none",border:"none",cursor:"pointer",color:t.textFaint,marginLeft:6,fontSize:13}}>✕</button></span>
          ))}
        </div>
      </div>

      <div className="card" style={{background:t.card,borderColor:t.cardBorder,marginBottom:16}}>
        <div style={{fontSize:14,fontWeight:700,marginBottom:10,color:t.text}}>ITIL Quick Reference</div>
        <div style={{fontSize:12,color:t.textMuted,lineHeight:1.7}}>
          <b style={{color:t.text}}>Incident</b> — An unplanned interruption to a service, or reduction in quality. File when something that was working has stopped working (e.g., email down, laptop won't boot).<br/>
          <b style={{color:t.text}}>Service Request</b> — A formal user request for something new or a change. File when asking for something that isn't currently provisioned (e.g., new access, new software, new laptop).<br/>
          <b style={{color:t.text}}>Priority</b> — Derived from <i>Impact</i> (how widely felt) × <i>Urgency</i> (how time-critical). P1 = Critical, P4 = Low.<br/>
          <b style={{color:t.text}}>Status flow (incident)</b> — New → Assigned → In Progress → Resolved → Closed.<br/>
          <b style={{color:t.text}}>Status flow (request)</b> — New → Pending Approval → Approved → In Progress → Fulfilled → Closed.
        </div>
      </div>

      <div style={{fontSize:11,color:t.textFaint,textAlign:"center",marginTop:24,marginBottom:24}}>
        ITSM Register · stored locally in your browser · no server, no account
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
function App(){
  const [state,setState]=useState(loadState);
  const [view,setView]=useState("dashboard");
  const [editing,setEditing]=useState(null); // record being edited/created
  const [toast,setToast]=useState(null);

  useEffect(()=>{saveState(state);},[state]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(null),2600);return()=>clearTimeout(t);},[toast]);

  const theme=THEMES[state.settings.theme]||THEMES.light;
  const t=theme;

  const openRecord=(rec)=>setEditing({...rec});
  const newIncident=()=>setEditing(emptyIncident());
  const newRequest=()=>setEditing(emptyRequest());

  const saveRecord=(rec)=>{
    setState(s=>{
      const isInc=rec.type==="incident";
      const list=isInc?s.incidents:s.requests;
      const existingIdx=list.findIndex(x=>x.id===rec.id);
      let finalRec={...rec};
      if(existingIdx===-1&&!finalRec.ticketNo){
        const cKey=isInc?"incCounter":"reqCounter";
        const prefix=isInc?"INC":"REQ";
        finalRec.ticketNo=`${prefix}${padNum(s.settings[cKey])}`;
        const newSettings={...s.settings,[cKey]:(s.settings[cKey]||1)+1};
        const newList=[...list,finalRec];
        return{...s,[isInc?"incidents":"requests"]:newList,settings:newSettings};
      }
      const newList=existingIdx===-1?[...list,finalRec]:list.map((x,i)=>i===existingIdx?finalRec:x);
      return{...s,[isInc?"incidents":"requests"]:newList};
    });
    setEditing(null);
    setToast(rec.ticketNo?`Saved ${rec.ticketNo}`:`Ticket created`);
  };

  const deleteRecord=(rec)=>{
    setState(s=>{
      const isInc=rec.type==="incident";
      return{...s,[isInc?"incidents":"requests"]:(isInc?s.incidents:s.requests).filter(x=>x.id!==rec.id)};
    });
    setEditing(null);
    setToast(`Deleted ${rec.ticketNo}`);
  };

  // keyboard shortcuts
  useEffect(()=>{
    const h=(e)=>{
      if(editing)return;
      if(e.target.tagName==="INPUT"||e.target.tagName==="TEXTAREA"||e.target.tagName==="SELECT")return;
      if(e.key==="i"||e.key==="I"){e.preventDefault();newIncident();}
      else if(e.key==="r"||e.key==="R"){e.preventDefault();newRequest();}
      else if(e.key==="d"||e.key==="D"){e.preventDefault();setView("dashboard");}
      else if(e.key==="1"){e.preventDefault();setView("dashboard");}
      else if(e.key==="2"){e.preventDefault();setView("incidents");}
      else if(e.key==="3"){e.preventDefault();setView("requests");}
    };
    document.addEventListener("keydown",h);
    return()=>document.removeEventListener("keydown",h);
  },[editing]);

  const allRecords=[...state.incidents,...state.requests];
  const openIncCount=state.incidents.filter(r=>!["Resolved","Closed","Cancelled"].includes(r.status)).length;
  const openReqCount=state.requests.filter(r=>!["Fulfilled","Closed","Rejected"].includes(r.status)).length;

  const SideBtn=({id,icon,label,badge})=>(
    <button className="side-btn" onClick={()=>setView(id)} style={{background:view===id?t.hover:"transparent",color:view===id?t.text:t.textMuted,fontWeight:view===id?600:500}}>
      <span className="ico">{icon}</span>
      <span style={{flex:1}}>{label}</span>
      {badge>0&&<span className="pill" style={{background:t.accent,color:t.accentText,fontSize:10,padding:"1px 7px"}}>{badge}</span>}
    </button>
  );

  return(
    <div style={{display:"flex",height:"100vh",background:t.bg,color:t.text}}>
      {/* Sidebar */}
      <aside style={{width:232,background:t.sidebar,borderRight:`1px solid ${t.cardBorder}`,display:"flex",flexDirection:"column",flexShrink:0}}>
        <div style={{padding:"18px 18px 12px"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:34,height:34,borderRadius:9,background:`linear-gradient(135deg,${t.accent},${t.p2Text})`,display:"flex",alignItems:"center",justifyContent:"center",color:"#fff",fontSize:18,fontWeight:800}}>IT</div>
            <div>
              <div style={{fontSize:15,fontWeight:700,color:t.text,lineHeight:1.1}}>ITSM Register</div>
              <div style={{fontSize:10,color:t.textFaint,marginTop:2,letterSpacing:0.5,textTransform:"uppercase",fontWeight:600}}>ITIL-aligned</div>
            </div>
          </div>
        </div>
        <div style={{padding:"0 10px",display:"flex",flexDirection:"column",gap:2}}>
          <SideBtn id="dashboard" icon="◉" label="Dashboard"/>
          <SideBtn id="incidents" icon="⚠" label="Incidents" badge={openIncCount}/>
          <SideBtn id="requests" icon="⊕" label="Service Requests" badge={openReqCount}/>
          <SideBtn id="settings" icon="⚙" label="Settings"/>
        </div>
        <div style={{marginTop:"auto",padding:"14px 14px 16px"}}>
          <div style={{display:"flex",flexDirection:"column",gap:6}}>
            <Btn t={t} onClick={newIncident} style={{width:"100%",justifyContent:"center"}}>+ Raise Incident</Btn>
            <Btn t={t} variant="ghost" onClick={newRequest} style={{width:"100%",justifyContent:"center"}}>+ New Request</Btn>
          </div>
          <div style={{fontSize:10,color:t.textFaint,marginTop:14,lineHeight:1.6,textAlign:"center"}}>
            Shortcuts: <span className="kbd" style={{background:t.badge,color:t.badgeText}}>I</span> incident · <span className="kbd" style={{background:t.badge,color:t.badgeText}}>R</span> request<br/>
            <span className="kbd" style={{background:t.badge,color:t.badgeText}}>1</span>/<span className="kbd" style={{background:t.badge,color:t.badgeText}}>2</span>/<span className="kbd" style={{background:t.badge,color:t.badgeText}}>3</span> navigate
          </div>
        </div>
      </aside>

      {/* Main area */}
      <main style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column"}}>
        {view==="dashboard"&&<Dashboard state={state} theme={t} onOpen={openRecord} setView={setView}/>}
        {view==="incidents"&&<Register records={state.incidents} type="incident" theme={t} onOpen={openRecord} onNew={newIncident}/>}
        {view==="requests"&&<Register records={state.requests} type="request" theme={t} onOpen={openRecord} onNew={newRequest}/>}
        {view==="settings"&&<Settings state={state} setState={setState} theme={t} setToast={setToast}/>}
      </main>

      {editing&&<Drawer record={editing} onClose={()=>setEditing(null)} onSave={saveRecord} onDelete={deleteRecord} theme={t} services={state.settings.services}/>}

      {toast&&<div className="toast" style={{background:t.accent,color:t.accentText}}>{toast}</div>}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
