INSERT INTO department (department_name)
VALUES
  ('Maintenance'),
  ('Engineering'),
  ('Tech Support');
							 
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Supervisor', '200000', '2'),
  ('Technician', '50000','3'),
  ('Assistant', '70000', '2');

INSERT INTO employee (first_name, last_name, role_id)
VALUES
  ('Ronald', 'Giant', "1"),
  ('Tiki', 'Barber', "2"),
  ('Piers', 'Morgan', "3");
