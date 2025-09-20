```markdown
Template & answer key formats for the PoC

1) template.json
{
  "version": "v1",
  "template_size": [1200, 1700],
  "threshold": 150,
  "bubbles": {
    "Q1": {"bbox": [100,200,40,40], "choice": "A"},
    "Q2": {"bbox": [200,200,40,40], "choice": "A"}
  },
  "subjects": {
    "math": [1,10],
    "science": [11,20]
  }
}

2) answer_key.json
{
  "answers": {
    "Q1": "A",
    "Q2": "B"
  }
}

Put mobile photos in sample_data/raw_images/ and the blank scan if available.
```