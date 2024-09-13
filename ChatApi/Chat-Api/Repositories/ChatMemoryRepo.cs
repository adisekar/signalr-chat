using System;

namespace Chat_Api.Repositories
{
    public class ChatMemoryRepo:IChatRepo
    {
        private readonly List<string> chats = new List<string>();

        public ChatMemoryRepo()
        {
            chats.Add("Hello");
            chats.Add("How are you?");
            chats.Add("Hii There");
        }

        public IEnumerable<string> GetAll()
        {
            return chats;
        }

        public void NewChat(string message)
        {
            chats.Add(message);
        }
    }
}
