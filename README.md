
### Installation

Create a .env file as described in the [webapp boilerplate](https://github.com/erik-sn/webapp/)

```bash
git clone https://github.com/erik-sn/quote_generator/
cd quote_generator
pip install -r requirements.txt  # install python dependencies
python manage.py migrate  # set up database
cd ts
yarn  # install node dependencies
```

### Tests

Django tests:
```bash
python manage.py test
```

Frontend tests:
```bash
cd ts
npm t
```

### Running application for development

After installation open two terminals in the root of the project. In the first:

```bash
python manage.py runserver
```

And the second:

```bash
cd ts
npm run dev
```

