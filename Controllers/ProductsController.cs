using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication;
using Newtonsoft.Json;

namespace WebApplication.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ModelContext _context;

        public ProductsController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Products>>> GetProduct()
        {
            return await (from product in _context.Product
                                 join category in _context.Category on product.CategoryID equals category.ID into tmp
                                 from m in tmp.DefaultIfEmpty()

                                 select new Products
                                 {
                                     ID = product.ID,
                                     ProductName = product.ProductName,
                                     Description = product.Description,
                                     CategoryID = product.CategoryID,
                                     Category = m,
                                 }
            ).ToListAsync();
        }

        // GET: api/Products/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Products>> GetProducts(int id)
        {
            var products = await _context.Product.FindAsync(id);

            if (products == null)
            {
                return NotFound();
            }

            return products;
        }

        // PUT: api/Products/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducts(int id, Products products)
        {
            if (id != products.ID)
            {
                return BadRequest();
            }

            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Products
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts([FromBody]Products data)
        {
            _context.Product.Add(data);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetProducts", new { id = data.ID }, data);
        }

        // DELETE: api/Products
        [HttpDelete]
        public async Task<ActionResult<Products>> DeleteProducts(List<int> productId)
        {
            foreach (var id in productId)
            {
                var products = await _context.Product.FindAsync(id);
                if (products == null)
                {
                    return NotFound();
                }

                _context.Product.Remove(products);
                await _context.SaveChangesAsync();
            }

            return Ok("Successfully deleted");
        }

        private bool ProductsExists(int id)
        {
            return _context.Product.Any(e => e.ID == id);
        }
    }
}
