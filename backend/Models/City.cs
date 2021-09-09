using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models
{
    [Table("City")] //Default table name is the name of the class, can be changed with this function
    public class City {
        
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        [MaxLength(255)]
        public string Name { get; set; }  
    
        [Column("Streets")]
        public virtual List<Street> Streets { get; set; } //For pointers we use VIRTUAL, foreign key not need because of virtual function
    }
}