import "./pipeline.css";
import type {APIResponse, PipelineLogRow} from "../types/api"

export function PipelinePage() {
  const div = document.createElement("div");
  div.className = "pipeline-page"
  div.innerHTML = `
    <h1 class="header">Pipeline</h1>
    <p class="description">Refresh bestbuy data product listings and types:</p>
    <button id="refreshData" type="button">Refresh Data</button>
    <span id="loading" style="display: none">
      Refreshing data (this may take a minute)...
    </span>

    <div id="message"></div>

    <div class="table-responsive scrollable-table">
      <table id="pipelineLogTable" class="table table-bordered table-sm table-striped results mx-auto">
        <thead>
          <th>Date</th>
          <th>Status</th>
        </tr>
      </table>
    </div>
  `;

  const refreshButton = div.querySelector("#refreshData") as HTMLButtonElement
  const loading = div.querySelector("#loading") as HTMLSpanElement
  const message = div.querySelector("#message") as HTMLDivElement
  const pipelineLogTable = div.querySelector("#pipelineLogTable") as HTMLTableElement

  async function generatePipelineLogTbl() {
    pipelineLogTable.querySelectorAll("tbody").forEach(tb => tb.remove());
    const pipelineResposne = fetch('/pipeline/log').then(response => {
      return response.json() as Promise<APIResponse<PipelineLogRow>>
    }).then(data => {
      const tbody = pipelineLogTable.createTBody()
      for (const row of data.content) {
        const tr = tbody.insertRow()
        const cell1 = tr.insertCell()
        cell1.textContent = row.date.toString()
        const cell2 = tr.insertCell()
        cell2.textContent = row.status
      }
    })
  }

  generatePipelineLogTbl()

  refreshButton.addEventListener("click", async () => {
    refreshButton.disabled = true;
    loading.style.display = "inline"
    message.textContent = ""
    try{
      const refreshResponse = await fetch('/pipeline/refresh', {
        method: 'POST'
      })

      if (!refreshResponse.ok) {
        throw new Error(`Request failed: ${refreshResponse.status}`);
      }

      const data = await refreshResponse.json() as APIResponse<unknown>

      message.textContent = data.message
      message.style.color = "green"

    } catch (err) {
      console.log(err)
      message.textContent = "Data pipeline failed"
      message.style.color = "red"

    } finally {
      loading.style.display = "none"
      refreshButton.disabled = false;
      generatePipelineLogTbl()
    }
  })

  return div;
}