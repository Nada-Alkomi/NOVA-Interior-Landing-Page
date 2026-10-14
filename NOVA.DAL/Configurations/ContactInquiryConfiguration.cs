using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using NOVA.DAL.Models;

namespace NOVA.DAL.Configurations
{

    public class ContactInquiryConfiguration: IEntityTypeConfiguration<ContactInquiry>
    {
        public void Configure(EntityTypeBuilder<ContactInquiry> modelbuilder)
        {
            modelbuilder.HasKey(x => x.Id);

            modelbuilder.Property(x => x.Name)
                .IsRequired()
                .HasMaxLength(100);

            modelbuilder.Property(x => x.Email)
                .IsRequired()
                .HasMaxLength(150);

            modelbuilder.Property(x => x.Subject)
                .IsRequired()
                .HasMaxLength(200);

            modelbuilder.Property(x => x.Message)
                .IsRequired()
                .HasMaxLength(2000);

            modelbuilder.Property(x => x.CreatedAt)
                .IsRequired();
        }
    }
}
