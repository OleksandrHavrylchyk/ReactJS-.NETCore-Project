using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ModelContext _context;

        public CategoriesController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categories>>> GetCategory()
        {
            IQueryable<Products> source = _context.Product.Include(x => x.Category);
            var maxPrice = source.Max(p => p.Price);
            var minPrice = source.Min(p => p.Price);

            Dictionary<string, float> prices = new Dictionary<string, float>();
            prices.Add("max", maxPrice);
            prices.Add("min", minPrice);

            var categories = await _context.Category.ToListAsync();

            Dictionary<string, object> response = new Dictionary<string, object>(); 
            response.Add("categories", categories);
            response.Add("prices", prices);
            return Ok(response);
        }
    }
}
