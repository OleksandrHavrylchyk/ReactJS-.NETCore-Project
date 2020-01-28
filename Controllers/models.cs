using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication;

namespace WebApplication.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class models : ControllerBase
    {
        private readonly ModelContext _context;

        public models(ModelContext context)
        {
            _context = context;
        }

        // GET: api/models
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Model>>> GetModel()
        {
            return await _context.Model.ToListAsync();
        }

        // GET: api/models/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Model>> GetModel(int id)
        {
            var model = await _context.Model.FindAsync(id);

            if (model == null)
            {
                return NotFound();
            }

            return model;
        }

        // PUT: api/models/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutModel(int id, Model model)
        {
            if (id != model.Id)
            {
                return BadRequest();
            }

            _context.Entry(model).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ModelExists(id))
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

        // POST: api/models
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Model>> PostModel(Model model)
        {
            _context.Model.Add(model);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetModel", new { id = model.Id }, model);
        }

        // DELETE: api/models/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Model>> DeleteModel(int id)
        {
            var model = await _context.Model.FindAsync(id);
            if (model == null)
            {
                return NotFound();
            }

            _context.Model.Remove(model);
            await _context.SaveChangesAsync();

            return model;
        }

        private bool ModelExists(int id)
        {
            return _context.Model.Any(e => e.Id == id);
        }
    }
}
