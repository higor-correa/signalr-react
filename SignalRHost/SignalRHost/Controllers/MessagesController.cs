using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using SignalRHost.Hubs;
using System.Threading.Tasks;

namespace SignalRHost.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MessagesController : ControllerBase
    {
        private IHubContext<ChatHub> _chatHubContext;

        public MessagesController(IHubContext<ChatHub> chatHubContext)
        {
            _chatHubContext = chatHubContext;
        }

        [HttpPost("send")]
        public async Task<IActionResult> SendAsync(MessageRequest messageRequest)
        {
            var user = messageRequest.User;
            var message = messageRequest.Message;
            await _chatHubContext.Clients.All.SendAsync("ReceiveMessage", user, message);
            return Ok();
        }


    }

    public class MessageRequest
    {
        public string Message { get; set; }
        public string User { get; set; }
    }
}