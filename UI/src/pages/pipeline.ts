import "./pipeline.css";
import type {APIResponse} from "../types/api"

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
      <table id="pipelineLogTable"
        class="table table-bordered table-sm table-striped results mx-auto">
      </table>
    </div>
  `;

  const refreshButton = div.querySelector("#refreshData") as HTMLButtonElement
  const loading = div.querySelector("#loading") as HTMLSpanElement
  const message = div.querySelector("#message") as HTMLDivElement

  refreshButton.addEventListener("click", async () => {
    refreshButton.disabled = true;
    loading.style.display = "inline"
    message.textContent = ""
    try{
      const response = await fetch('/pipeline/refresh', {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data = await response.json() as APIResponse<unknown>

      message.textContent = data.message
      message.style.color = "green"

    } catch (err) {
      console.log(err)
      message.textContent = "Data pipeline failed"
      message.style.color = "red"

    } finally {
      loading.style.display = "none"
      refreshButton.disabled = false;
    }
  })

  return div;
}