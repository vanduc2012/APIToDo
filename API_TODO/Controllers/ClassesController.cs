using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_TODO.Models;

namespace API_TODO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClassesController : ControllerBase
    {
        private readonly API_TODODBContext _context;

        public ClassesController(API_TODODBContext context)
        {
            _context = context;
        }

        // GET: api/Classes
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ClassModel>>> GetClassModel()
        {
            return await _context.ClassModel.Where(x=>x.IsDelete == false).ToListAsync();
        }

        // GET: api/Classes/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ClassModel>> GetClassModel(int id)
        {
            var classModel = await _context.ClassModel.FindAsync(id);

            if (classModel == null)
            {
                return NotFound();
            }

            return classModel;
        }
       
        // PUT: api/Classes/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutClassModel(int id, ClassModel classModel)
        {
            if (id != classModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(classModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassModelExists(id))
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

        // POST: api/Classes
        [HttpPost]
        public async Task<ActionResult<ClassModel>> PostClassModel(ClassModel classModel)
        {
            _context.ClassModel.Add(classModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetClassModel", new { id = classModel.Id }, classModel);
        }

        // DELETE: api/Classes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<ClassModel>> DeleteClassModel(int id)
        {
            var classModel = await _context.ClassModel.FindAsync(id);
            if (classModel == null)
            {
                return NotFound();
            }

            _context.ClassModel.Remove(classModel);
            await _context.SaveChangesAsync();

            return classModel;
        }

        private bool ClassModelExists(int id)
        {
            return _context.ClassModel.Any(e => e.Id == id);
        }
    }
}
