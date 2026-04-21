// Entry point for the AeroMetrix ASP.NET Core Web API; configures services including EF Core SQLite, CORS for the Vite frontend, and Swagger.
using Microsoft.EntityFrameworkCore;
using AeroMetrix.API.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the IoC container.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=aerometrix.db"));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowVite",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowVite");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
