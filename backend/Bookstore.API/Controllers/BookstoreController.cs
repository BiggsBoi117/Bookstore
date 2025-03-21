using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _context; // Context
        public BookstoreController(BookstoreDbContext context) => _context = context; // Constructor

        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize=5, int currentPage=1)
        {
            var books = _context.Books
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalCount = _context.Books.Count();

            var requestObject = new
            {
                Books = books,
                TotalCount = totalCount
            };

            return Ok(requestObject);
        }


                
    }
}
