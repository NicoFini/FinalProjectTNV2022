using Comments.Core;
using Comments.Core.Service;
using Comments.DB;
using System.Web.Http;
using System.Web.Http.Cors;

namespace Comments.RestAPI
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors();

            // Add services to the container.
            builder.Services.AddControllersWithViews();


            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            builder.Services.AddSingleton<StorageServiceComments, MySqlStorageService>();
            builder.Services.AddSingleton<ApplicationManagerComments>();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }


            app.UseCors(builder =>
            {
                builder.AllowAnyOrigin()
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            });


            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}