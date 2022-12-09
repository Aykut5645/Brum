using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Brum.API.Data;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.DependencyInjection;

namespace Brum.API.Helpers
{
    public class LogUserActivity : IAsyncActionFilter
    {
        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var resultsContext = await next();

            var userId = int.Parse(resultsContext.HttpContext.User.FindFirst(ClaimTypes.NameIdentifier).Value);

            var repo = resultsContext.HttpContext.RequestServices.GetService<IUsersRepository>();
            var user = await repo.GetUser(userId, true);
            user.LastActive = DateTime.Now;
            await repo.SaveAll();
        }
    }
}