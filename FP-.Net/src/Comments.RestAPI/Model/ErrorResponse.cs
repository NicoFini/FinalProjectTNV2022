using System;
using System.ComponentModel;

namespace Comments.RestAPI.Model
{
    public class ErrorResponse
    {
        [DisplayName("error_message")]
        public string Message { get; set; }

        [DisplayName("timestamp")]
        public DateTime TimeStamp { get; set; }

        public ErrorResponse(string message)
        {
            this.Message = message;
            this.TimeStamp = DateTime.Now;
        }
    }
}
