using Microsoft.EntityFrameworkCore.Migrations;

namespace API_TODO.Migrations
{
    public partial class AddClassId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentsModel_ClassModel_ClassesId",
                table: "StudentsModel");

            migrationBuilder.AlterColumn<string>(
                name: "CodeView",
                table: "StudentsModel",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ClassesId",
                table: "StudentsModel",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CodeView",
                table: "ClassModel",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_StudentsModel_ClassModel_ClassesId",
                table: "StudentsModel",
                column: "ClassesId",
                principalTable: "ClassModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_StudentsModel_ClassModel_ClassesId",
                table: "StudentsModel");

            migrationBuilder.AlterColumn<string>(
                name: "CodeView",
                table: "StudentsModel",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<int>(
                name: "ClassesId",
                table: "StudentsModel",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<string>(
                name: "CodeView",
                table: "ClassModel",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_StudentsModel_ClassModel_ClassesId",
                table: "StudentsModel",
                column: "ClassesId",
                principalTable: "ClassModel",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
