using Microsoft.AspNetCore.Mvc;
using testu.AzureRequests;

namespace testu.Controllers
{
    [Route("api/[controller]")]
    public class SampleDataController : Controller
    {
        [HttpGet("[action]/{PAT}")]
        public string Projects(string PAT)
        {
            return ApiRequests.GetAllProjects(PAT).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{id}")]
        public string Project(string pat, string id)
        {
            return ApiRequests.GetProjectDetails(pat, id).GetAwaiter().GetResult();
        }
      
        [HttpGet("[action]/{pat}/{id}")]
        public string ProjectBuilds(string pat, string id)
        {
            return ApiRequests.GetProjectBuilds(pat, id).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{id}")]
        public string ProjectRepos(string pat, string id)
        {
            return ApiRequests.GetProjectRepos(pat, id).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{id}")]
        public string ProjectPullRequests(string pat, string id)
        {
            return ApiRequests.GetProjectPullRequests(pat, id).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{id}")]
        public string ProjectTestRuns(string pat, string id)
        {
            return ApiRequests.GetProjectTestRuns(pat, id).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{pid}/{rid}")]
        public string RepoCommits(string pat, string pid, string rid)
        {
            return ApiRequests.GetRepoCommits(pat, pid, rid).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{pid}/{tid}/{pname}")]
        public string ProjectWorkItems(string pat, string pid, string tid, string pname)
        {
            return ApiRequests.GetTasks(pat, pid, tid, pname).GetAwaiter().GetResult();
        }

        [HttpGet("[action]/{pat}/{taskId}")]
        public string SpecificTask(string pat, string taskId)
        {
            taskId = "https://sotfs01.so.edb.se/DefaultCollection/_apis/wit/workItems/" + taskId;
            return ApiRequests.GetSpecificTask(pat, taskId).GetAwaiter().GetResult();
        }
    }
}
