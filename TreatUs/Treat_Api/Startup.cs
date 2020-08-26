using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Options;
using Treat_Api.Models;
using Treat_Api.Services;

namespace Treat_Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            services.Configure<TreatDatabaseSettings>(
       Configuration.GetSection(nameof(TreatDatabaseSettings)));

            services.AddSingleton<ITreatDatabaseSettings>(sp =>
                sp.GetRequiredService<IOptions<TreatDatabaseSettings>>().Value);

            services.AddSingleton<UserService>();         
            services.AddSingleton<RestaurantsService>();
            services.AddSingleton<MailService>();        
            services.AddSingleton<TreatService>();
            services.AddSingleton<LoginService>();
            
            services.AddControllers();

            services.AddCors(options => { options.AddPolicy("CorsPolicy", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()); });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
