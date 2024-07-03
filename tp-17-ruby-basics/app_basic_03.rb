##### ARRAY #####
tab = ["Alex", "Bob", "Charlie"]
tab.each do |name|
  puts name
end
vartab = tab.join(", ")
msg = "Le tableau contient: #{vartab}"
puts msg
tab.push("Franck", "Gérard")
puts tab

##### HASH #####
## Empty Hash
person = {}
## Filled Hash
person = {'name' => 'Alex', 'age' => 40}
puts person['name']

##### SYMBOLS #####
puts :red.to_s
person = {name: 'Alex', age: 40}
puts person
puts person[:name]
