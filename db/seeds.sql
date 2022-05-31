INSERT INTO department (department_name)
VALUES
  ('Engineering'),
  ('Radiology'),
   ('Laboratory'),
  ('Tech Support');
							 
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Manager', '1500000', '1'),
 ('Superviser', '100000', '2'),
  ('Technologist', '70000','3'),
  ('Assistant', '50000', '4');

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Giant', "1", null),
  ('Tiki', 'Barber', "2", "1"),
   ('Jamie', 'Courtesy', "2", "1"),
    ('Sandy', 'Beach', "4", "2"),
  ('Piers', 'Morgan', "3", "1");
