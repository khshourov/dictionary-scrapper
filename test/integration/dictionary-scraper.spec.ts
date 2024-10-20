import { DictionaryScraper, Word } from '../../src';

describe('Cambridge dictionary web scrapping', () => {
  const VALID_MULTI_CATEGORY_WORD = 'present'; // By multi category, we mean word can be noun, verb, adjective etc
  const VALID_SINGLE_PURPOSE_WORD = 'hello';
  const NONSENSICAL_WORD = 'Prisencolinensinainciusol';

  let scraper = new DictionaryScraper();

  test('scraper should return expected data for valid single category word', async () => {
    const ret = await scraper.search(VALID_SINGLE_PURPOSE_WORD);

    expect(ret).not.toBeNull();
    expect(ret).toMatchObject<Word>({
      source: 'cambridge',
      name: VALID_SINGLE_PURPOSE_WORD,
      entry: {
        ipa_listings: {
          us: [
            {
              category: '',
              ipa: '/heˈloʊ/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/h/hel/hello/hello.mp3',
            },
          ],
          uk: [
            {
              category: '',
              ipa: '/heˈləʊ/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukh/ukhef/ukheft_029.mp3',
            },
          ],
        },
      },
    });
  });

  test('scraper should return expected data for valid multi category word', async () => {
    const ret = await scraper.search(VALID_MULTI_CATEGORY_WORD);

    expect(ret).not.toBeNull();
    expect(ret).toMatchObject<Word>({
      source: 'cambridge',
      name: VALID_MULTI_CATEGORY_WORD,
      entry: {
        ipa_listings: {
          us: [
            {
              category: 'noun',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
            },
            {
              category: 'adjective',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_01_00.mp3',
            },
            {
              category: 'verb',
              ipa: '/prɪˈzent/',
              audio:
                'https://dictionary.cambridge.org/media/english/us_pron/p/pre/prese/present_02_00.mp3',
            },
          ],
          uk: [
            {
              category: 'noun',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpre/ukprepo020.mp3',
            },
            {
              category: 'adjective',
              ipa: '/ˈprez.ənt/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpre/ukprepo020.mp3',
            },
            {
              category: 'verb',
              ipa: '/prɪˈzent/',
              audio:
                'https://dictionary.cambridge.org/media/english/uk_pron/u/ukp/ukpre/ukprepo021.mp3',
            },
          ],
        },
      },
    });
  });

  test('scraper should return null for nonsensical word', async () => {
    const ret = await scraper.search(NONSENSICAL_WORD);

    expect(ret).toBeNull();
  });
});
