const tabContainer = document.getElementById('tab-container');
const issueContainer = document.getElementById('issues-container');
const loadingSpinner = document.getElementById('loading-spinner')
const countIssue = document.getElementById('issue-count')
let issues = []

//Filter Tab
function filterIssues(status){
  const tabs = ['all', 'open', 'closed']
  tabs.forEach(t => {
    const btn = document.getElementById(`tab-${t}`)
    if (t === status) {
      btn.classList.add('btn-primary')
      btn.classList.remove('btn')
    }else{
      btn.classList.add('btn')
      btn.classList.remove('btn-primary')
    }
 //   const statusBtn = document.getElementById(status)
  //  btn.classList.add('btn-primary')
    
  })
  if(status === 'all'){
    displayIssues(issues)
  }else{
    const filtered = issues.filter(issue => issue.status === status)
    displayIssues(filtered)
  }
}

//Loading
function removeSpinner(status) {

    if (status == true) {
        document.getElementById("spinner-container").classList.remove("hidden");
        document.getElementById("issue-all-card").classList.add("hidden");
    } else {
        document.getElementById("spinner-container").classList.add("hidden");
        document.getElementById("issue-all-card").classList.remove("hidden");
    }

}

//Modal function
const allActiveCard = async (id) => {

    const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    displayShowModal(data.data)

}

function displayShowModal(card) {
    // console.log(card)
    const modalContainer = document.getElementById("modal_container")
    modalContainer.innerHTML = "";

    const div = document.createElement("div")
    div.innerHTML = `
                        <div class="space-y-6 border-[2px] border-opacity-100  rounded-md p-4 ${card.status === "closed" ? "border-[#a855f7]" : "border-[#22b780]"}">

                          <div>
                              <h2 class="font-semibold text-2xl mb-2">${card.title}</h2>
              
                              <div class="flex items-center gap-2 flex-wrap sm:flex">
                               <p class="text-sm px-3 py-[2px] text-white rounded-2xl font-semibold
                                         ${card.status === "closed" ? "bg-[#a855f7]" : "bg-[#22b780]"}">
                                         ${card.status}
                                         </p>
                                  <span class="w-[9px] h-[9px] rounded-full bg-gray-500"></span>
                                  <p class="text-sm text-[#64748b]">Opened by ${card.author}</p>
                                  <span class="w-[9px] h-[9px] rounded-full bg-gray-500"></span>
                                  <p class="text-sm text-[#64748b]">
                                      ${new Date(card.createdAt).toLocaleDateString()}
                                  </p>
                              </div>
                          </div>
              
                          <div class="flex flex-wrap gap-3">
                              ${bugAndHelpLabels(card.labels)}
                          </div>
              
                          <p class="text-[15px] text-[#64748b]">
                              ${card.description}
                          </p>
              
                          <div class="bg-[#f8fafc] flex p-4 rounded-lg">
                              <div class="w-[50%] space-y-1">
                                  <p class="text-[#64748b]">Assignee:</p>
                                  <p class="font-bold">${card.assignee.toUpperCase()}</p>
                              </div>
              
                              <div class="w-[50%] space-y-2">
                                  <p class="text-[#64748b]">Priority:</p>
                                   <p class="text-sm px-3 py-[2px] text-white inline-block rounded-2xl ${card.priority === "high"
            ? "bg-red-600"
            : card.priority === "medium"
                ? "bg-yellow-500"
                : "bg-gray-500"}">
                                           ${card.priority.toUpperCase()}
                                           </p>
                                                                                                     </div>
                          </div>
              
                          <div class="modal-action">
                              <form method="dialog">
                                  <button class="btn bg-gradient-to-r  from-purple-600 via-purple-500 to-blue-500 
                                      hover:opacity-90 transition text-white px-7 rounded-md">Close</button>
                              </form>
                          </div>
              
                      </div>
              

                      `;

    modalContainer.appendChild(div)

    document.getElementById("modal_card").showModal();

}


const bugAndHelpLabels = (labels) => {

    let newArr = labels.map((label) => {

        let icon = "";

        if (label === "bug") {
            icon = `<i class="fa-solid fa-bug"></i>`;
        }

        if (label === "help wanted") {
            icon = `<i class="fa-solid fa-handshake"></i>`;
        }

        if (label === "enhancement") {
            icon = `<i class="fa-solid fa-wand-magic-sparkles"></i>`;
        }

        return `<span class="flex items-center gap-1 font-semibold text-[10px] px-2 py-[2px] rounded-2xl border transition duration-200 group-hover:scale-105 
                      ${label === "bug" ? "bg-red-100 text-red-400" :
                label === "help wanted" ? "bg-[#fff6d1] text-[#f59e0b]" :
                    "bg-[#defce8] text-[#00a96e]"}"> ${icon} ${label.toUpperCase()} </span>  `;


    });

    return newArr.join(" ");

};

//card
async function loadIssues(){
  loadingSpinner.classList.remove('hidden')
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  loadingSpinner.classList.add('hidden')
  displayIssues(data.data)
}

function displayIssues(issues){
  countIssue.innerText = issues.length;
  console.log(issues)
  issues.forEach((issue) => {
    console.log(issue)
    const statusBadge = issue.status === 'open' ? '<img src="assets/Open-Status.png"/>' : '<img src="assets/Closed- Status .png"/>'
    const borderColor = issue.status === 'open' ? 'border-t-green-500' : 'border-t-purple-600'
    
    const card = document.createElement("div");
    card.className = "card bg-white shadow-sm";
    card.innerHTML = `<div class="card card-body border-t-4 ${borderColor}">
    <div class="flex justify-between">
      <p>${statusBadge}</p>
      <p class="badge badge-soft badge-error uppercase">${issue.priority}</div>
    </p>
    <h2 class="card-title font-semibold">${issue.title}
    </h2>
    <p>${issue.description}</p>
    <div class="flex justify-start gap-2 mt-2">
     ${bugAndHelpLabels(issue.labels)}
      
    </div>
    <p>${issue.id} ${issue.author}</p>
    <p>${issue.createdAt}</p>
  </div>
</div>`;
issueContainer.appendChild(card);
  
  })
}
loadIssues();


// search issue function button
const searchBtnIssues = document.getElementById("search-issue-btn")
    .addEventListener("click", () => {

        const searchIssues = document.getElementById("search-issue");
        let issuesInputValue = searchIssues.value.trim().toLowerCase();
        removeSpinner(true);
        fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=%7BsearchText%7D`)

            .then((res) => res.json())
            .then((data) => {
                const allData = data.data

                const issueSearch = allData.filter((issue) => issue.title.toLowerCase().includes(issuesInputValue))

                displayAllIssuesData(issueSearch);
                removeSpinner(false);
            })


    })

showFilterIssueBtn('all-btn');