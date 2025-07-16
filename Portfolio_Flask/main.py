with open("C:\\Users\\V\\OneDrive\\Desktop\\PEP CLASSES 4\\Portfolio_Flask\\templates\\index.html", "r") as f:
    lines = [line.lstrip("+") for line in f]

with open("C:\\Users\\V\\OneDrive\\Desktop\\PEP CLASSES 4\\Portfolio_Flask\\templates\\css.html" , "w") as f:
    f.writelines(lines)

