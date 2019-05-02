﻿using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace API_TODO.Migrations
{
    public partial class init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ClassModel",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CodeView = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    IsDelete = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ClassModel", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "StudentsModel",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CodeView = table.Column<string>(nullable: true),
                    Name = table.Column<string>(nullable: true),
                    BirthDay = table.Column<DateTime>(nullable: false),
                    Address = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    Genre = table.Column<string>(nullable: true),
                    ClassesId = table.Column<int>(nullable: true)
                },
                
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudentsModel", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StudentsModel_ClassModel_ClassesId",
                        column: x => x.ClassesId,
                        principalTable: "ClassModel",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });
            
            migrationBuilder.CreateIndex(
                name: "IX_StudentsModel_ClassesId",
                table: "StudentsModel",
                column: "ClassesId");
            
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StudentsModel");

            migrationBuilder.DropTable(
                name: "ClassModel");
        }
    }
}
