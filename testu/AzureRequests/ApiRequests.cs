using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;
using testu.models;

namespace testu.AzureRequests
{
    public static class ApiRequests
    {
        private static string _res = "";

        public static async Task<string> GetAllProjects(string PAT)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/_apis/projects?"))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();
                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }


        public static async Task<string> GetProjectDetails(string PAT, string id)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/_apis/projects/" + id))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();
                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }

        public static async Task<string> GetProjectBuilds(string PAT, string id)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/" + id + "/_apis/build/builds"))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();
                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }

        public static async Task<string> GetProjectRepos(string PAT, string id)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/" + id + "/_apis/git/repositories?"))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();

                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }

        public static async Task<string> GetProjectPullRequests(string PAT, string id)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/" + id + "/_apis/git/pullrequests"))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();
                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }

        public static async Task<string> GetProjectTestRuns(string PAT, string id)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/" + id + "/_apis/test/runs"))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();
                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }

        public static async Task<string> GetRepoCommits(string PAT, string projId, string repoId)
        {
            try
            {
                using (HttpClient client = NewHttpClientWithHeaders(PAT))
                {
                    using (HttpResponseMessage response = await client.GetAsync(
                                "https://sotfs01.so.edb.se/DefaultCollection/" + projId + "/_apis/git/repositories/" + repoId + "/commits?"))
                    {
                        response.EnsureSuccessStatusCode();
                        _res = await response.Content.ReadAsStringAsync();
                    }
                    return Response(_res);
                }
            }
            catch (Exception)
            {
                return Response(_res);
            }
        }

        public static async Task<string> GetTasks(string PAT, string projId, string teamId, string projName)
        {
            var url = "https://sotfs01.so.edb.se/DefaultCollection/" + projId + "/" + teamId + "/_apis/wit/wiql?api-version=4.0";

            using (var client = NewHttpClientWithHeaders(PAT))
            {
                var response = client.PostAsync(url, Content(projName)).Result;
                response.EnsureSuccessStatusCode();
                string jsonRes = await response.Content.ReadAsStringAsync();
                RootObject jsRoot = JsonConvert.DeserializeObject<RootObject>(jsonRes);
                _res = JsonConvert.SerializeObject(jsRoot.workItems);

            }
            return Response(_res);
        }

        public static async Task<string> GetSpecificTask(string PAT, string url)
        {
            using (HttpClient client = NewHttpClientWithHeaders(PAT))
            {
                using (HttpResponseMessage response = await client.GetAsync(
                            url))
                {
                    response.EnsureSuccessStatusCode();
                    _res = await response.Content.ReadAsStringAsync();
                }
            }
            return Response(_res);
        }

        #region privates

        private static HttpClient NewHttpClientWithHeaders(string PAT)
        {
            var client = new HttpClient();
            client.DefaultRequestHeaders.Accept.Add(
                        new MediaTypeWithQualityHeaderValue("application/json"));
            client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Basic",
                Convert.ToBase64String(
                    Encoding.ASCII.GetBytes(
                        string.Format("{0}:{1}", "", PAT))));
            return client;
        }

        private static string Response(string res)
        {
            _res = "";
            return res != "" ? res : "{\"message\" : \"You done goofed!\"}";
        }

        private static StringContent Content(string projName)
        {
            //hiding som uglyness
            var query = "{\"query\": \"Select [System.Id], [System.Title], " +
                "[System.State] From WorkItems " +
                "Where [System.WorkItemType] = 'Task'" +
                " AND [System.TeamProject] = '" + projName + " '" +
                " order by [Microsoft.VSTS.Common.Priority] asc, [System.CreatedDate] desc\"}";
            return new StringContent(query, Encoding.UTF8, "application/json");
        }
        #endregion
    }
}
