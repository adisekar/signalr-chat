namespace Chat_Api.Repositories
{
    public interface IChatRepo
    {
        IEnumerable<string> GetAll();
        void NewChat(string message);
    }
}
