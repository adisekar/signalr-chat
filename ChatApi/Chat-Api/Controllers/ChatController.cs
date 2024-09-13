using Chat_Api.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace Chat_Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepo _chatRepo;
        private readonly IHubContext<ChatHub> _hubContext;

        public ChatController(IChatRepo chatRepo, IHubContext<ChatHub> hubContext)
        {
            _chatRepo = chatRepo;
            _hubContext = hubContext;
        }


        [HttpGet]
        public IEnumerable<string> Get()
        {
            return _chatRepo.GetAll();
        }

        [HttpPost]
        public void Post(string message)
        {
            _chatRepo.NewChat(message);
        }

        [HttpGet("Send")]
        public async void Send()
        {
          await _hubContext.Clients.All.SendAsync("ServerMessage", "Hello from Server");
        }
    }
}
