﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API_TODO.Migrations
{
    [DbContext(typeof(API_TODODBContext))]
    [Migration("20190424063709_addIsdeleteInStudent")]
    partial class addIsdeleteInStudent
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "2.2.3-servicing-35854")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("API_TODO.Models.ClassModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CodeView");

                    b.Property<bool>("IsDelete");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("ClassModel");
                });

            modelBuilder.Entity("API_TODO.Models.StudentsModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Address");

                    b.Property<DateTime>("BirthDay");

                    b.Property<int?>("ClassesId");

                    b.Property<string>("CodeView");

                    b.Property<string>("Genre");

                    b.Property<bool>("IsDelete");

                    b.Property<string>("Name");

                    b.Property<string>("PhoneNumber");

                    b.HasKey("Id");

                    b.HasIndex("ClassesId");

                    b.ToTable("StudentsModel");
                });

            modelBuilder.Entity("API_TODO.Models.StudentsModel", b =>
                {
                    b.HasOne("API_TODO.Models.ClassModel", "Classes")
                        .WithMany()
                        .HasForeignKey("ClassesId");
                });
#pragma warning restore 612, 618
        }
    }
}