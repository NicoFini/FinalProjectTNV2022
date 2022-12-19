using Microsoft.AspNetCore.Mvc;
using System;
using Comments.Core;
using Comments.Core.Exceptions;
using Comments.Core.Model;
using Comments.Core.Service;
using Comments.RestAPI.Mapper;
using Comments.RestAPI.Model;

namespace Comments.RestAPI.Controllers
{
    [ApiController]
    [Route("Comments")]
    public class CommentsController : ControllerBase
    {
        private ApplicationManagerComments _managerComment;

        public CommentsController(ApplicationManagerComments managerComment)
        {
            _managerComment = managerComment;
        }
        
        [HttpGet("Get_All")]
        public ActionResult<List<CommentDto>> GetAllComments() =>
            Ok(_managerComment.GetAllComments().Select(s => CommentDtoMapper.From(s)).ToList());

        [HttpGet("Get_By_Id"+"{id:int}")]

        public ActionResult<CommentDto> GetCommentById( int id)
        {
            try
            {
                var s = _managerComment.GetComment(id);
                return Ok(CommentDtoMapper.From(s));
            }

            catch (CommentNotFound e)
            {
                return NotFound(new ErrorResponse(e.Message));
            }
        }

        [HttpPost("Create_New")]
        public ActionResult<CommentDto> CreateComment([FromBody] CommentRequest body)
        {
            try
            {
                var c = _managerComment.CreateComment(body.User, body.MovieId, body.Comment);
                var uri = $"/Insert/{c._comment}";
                return Created(uri, CommentDtoMapper.From(c));
            }
            catch (WrongLengthComment ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }
        [HttpDelete("Delete_Comment"+"{id:int}")]
        public ActionResult<bool> DeleteComment([FromRoute] int id)
        {
            try
            {
                var c = _managerComment.DeleteComment(id);
               
                return c;
            }
            catch (CommentNotFound ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }
        [HttpPut("Modify_Comment")]
        public ActionResult<string> ModifyComment([FromBody] CommentRequest body)
        {
            try
            {
                var c = _managerComment.ModifyComment(body.Id, body.User, body.MovieId, body.Comment);
                var uri = $"/Modify/{c._comment}";
                return "Commento Modificato";
            }
            catch (WrongLengthComment ex)
            {
                return BadRequest(new ErrorResponse(ex.Message));
            }
        }






    }
}

