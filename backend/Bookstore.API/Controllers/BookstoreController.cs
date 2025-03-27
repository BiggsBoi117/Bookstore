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
        public IActionResult GetBooks(int pageSize = 5, int currentPage = 1, string? title = null, [FromQuery] List<string>? categories = null)
        {
            var query = _context.Books.AsQueryable();

            // Apply filter if categories are provided
            if (categories != null)
            {
                query = query.Where(b => categories.Contains(b.Category));
            }

            // Apply filter if title is provided
            if (!string.IsNullOrWhiteSpace(title))
            {
                query = query.Where(b => b.Title.Contains(title));
            }

            var totalCount = query.Count(); // Count AFTER filtering

            var books = query
                .Skip((currentPage - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var response = new
            {
                Books = books,
                TotalCount = totalCount
            };

            return Ok(response);
        }

        [HttpGet("GetBookTypes")]
        public IActionResult GetBookTypes()
        {
            var bookTypes = _context.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookTypes);
        }

    }
}
