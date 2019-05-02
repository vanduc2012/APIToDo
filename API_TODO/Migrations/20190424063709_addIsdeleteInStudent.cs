using Microsoft.EntityFrameworkCore.Migrations;

namespace API_TODO.Migrations
{
    public partial class addIsdeleteInStudent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsDelete",
                table: "StudentsModel",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDelete",
                table: "StudentsModel");
        }
    }
}
