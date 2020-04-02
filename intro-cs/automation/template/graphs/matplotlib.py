import matplotlib.pyplot as plt
DATA = (
('Q1 2017', 100),
('Q2 2017', 150),
('Q3 2017', 125),
('Q4 2017', 175),
)


POS = list(range(len(DATA)))
VALUES = [value for label, value in DATA]
LABELS = [label for label, value in DATA]

plt.bar(POS, VALUES)
plt.xticks(POS, LABELS)
plt.ylabel('Sales')


plt.show()
