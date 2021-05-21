describe('Basic user flow for SPA ', () => {
  beforeAll(async () => {
    await page.goto('http://127.0.0.1:5500');
    await page.waitForTimeout(500);
  });

  // test 1 is given
  it('Test1: Initial Home Page - Check for 10 Journal Entries', async () => {
    const numEntries = await page.$$eval('journal-entry', (entries) => {
      return entries.length;
    });
    expect(numEntries).toBe(10);
  });

  //test 2 is given
  it('Test2: Make sure <journal-entry> elements are populated', async () => {
    let allArePopulated = true;
    let data, plainValue;
    const entries = await page.$$('journal-entry');
    for (let i = 0; i < entries.length; i++) {
      data = await entries[i].getProperty('entry');
      plainValue = await data.jsonValue();
      if (plainValue.title.length == 0) { allArePopulated = false; }
      if (plainValue.date.length == 0) { allArePopulated = false; }
      if (plainValue.content.length == 0) { allArePopulated = false; }
    }
    expect(allArePopulated).toBe(true);
  }, 30000);

  it('Test3: Clicking first <journal-entry>, new URL should contain /#entry1', async () => {
    // implement test3: Clicking on the first journal entry should update the URL to contain “/#entry1”
    await page.click('journal-entry');
    const pageUrl = await page.url();  
    const urlSplit = pageUrl.split("/"); 
    expect(urlSplit[urlSplit.length - 1]).toBe('#entry1');
  });

  it('Test4: On first Entry page - checking page header title', async () => {
    // implement test4: Clicking on the first journal entry should update the header text to “Entry 1” 
    const headerTitle = await page.$eval('body > header > h1', el => el.textContent);
    expect(headerTitle).toBe('Entry 1');
  });

  it('Test5: On first Entry page - checking <entry-page> contents', async () => {
    /*
     implement test5: Clicking on the first journal entry should contain the following contents: 
        { 
          title: 'You like jazz?',
          date: '4/25/2021',
          content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
          image: {
            src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
            alt: 'bee with sunglasses'
          }
        }
      */
    const entry1 = await page.$eval('body > entry-page', el => el.entry); 
    const realEntry ={ 
      title: 'You like jazz?',
      date: '4/25/2021',
      content: "According to all known laws of aviation, there is no way a bee should be able to fly. Its wings are too small to get its fat little body off the ground. The bee, of course, flies anyway because bees don't care what humans think is impossible.",
      image: {
        src: 'https://i1.wp.com/www.thepopcornmuncher.com/wp-content/uploads/2016/11/bee-movie.jpg?resize=800%2C455',
        alt: 'bee with sunglasses'
      }
    };

    expect(entry1).toEqual(realEntry);
    

  }, 10000);

  it('Test6: On first Entry page - checking <body> element classes', async () => {
    // implement test6: Clicking on the first journal entry should update the class attribute of <body> to ‘single-entry’
    const bodyClass = await page.$eval('body', el => el.className);
    expect(bodyClass).toBe('single-entry');
  });

  it('Test7: Clicking the settings icon, new URL should contain #settings', async () => {
    // implement test7: Clicking on the settings icon should update the URL to contain “/#settings”
    await page.click('body > header > img');
    const pageUrl = await page.url();  
    const urlSplit = pageUrl.split("/"); 
    expect(urlSplit[urlSplit.length - 1]).toBe('#settings'); 

  });

  it('Test8: On Settings page - checking page header title', async () => {
    // implement test8: Clicking on the settings icon should update the header to be “Settings”
    const headerTitle = await page.$eval('body > header > h1', el => el.textContent);
    expect(headerTitle).toBe('Settings');
  });

  it('Test9: On Settings page - checking <body> element classes', async () => {
    // implement test9: Clicking on the settings icon should update the class attribute of <body> to ‘settings’
    const bodyClass = await page.$eval('body', el => el.className);
    expect(bodyClass).toBe('settings');

  });

  it('Test10: Clicking the back button, new URL should be /#entry1', async() => {
    // implement test10: Clicking on the back button should update the URL to contain ‘/#entry1’
    await page.goBack(); 
    const pageUrl = await page.url();  
    const urlSplit = pageUrl.split("/"); 
    expect(urlSplit[urlSplit.length - 1]).toBe('#entry1');
  });

  // define and implement test11: Clicking the back button once should bring the user back to the home page
  it ('Test 11: Clicking on back button, new URL should be /', async() => {
    await page.goBack(); 
    const pageUrl = await page.url();
    const urlSplit = pageUrl.split("/"); 
    expect(urlSplit[urlSplit.length - 1]).toBe("");
  });

  // define and implement test12: When the user is on the homepage, the header title should be “Journal Entries”
  it ('Test 12: User on homepage, header title should be "Journal Entries"', async() => {
    const headerTitle = await page.$eval('body > header > h1', el => el.textContent);
    expect(headerTitle).toBe('Journal Entries'); 
  });

  // define and implement test13: On the home page the <body> element should not have any class attribute 
  it ('Test 13: User on homepage, the body element should not have a class attribute', async() =>{
    const bodyClass = await page.$eval('body', el => el.className);
    expect(bodyClass).toBe("");
  });

  // define and implement test14: Verify the url is correct when clicking on the second entry
  it ('Test 14: User clicks on second entry, check that URL contains /#entry2', async()=> {
    await page.click('journal-entry:nth-child(2)');
    const pageUrl = await page.url();
    const urlSplit = pageUrl.split("/"); 
    expect(urlSplit[urlSplit.length - 1]).toBe("#entry2");
  });

  // define and implement test15: Verify the title is current when clicking on the second entry
  it ('Test 15: User is on second entry page, check that title is Entry 2', async()=>{
    const headerTitle = await page.$eval('body > header > h1', el =>el.textContent);
    expect(headerTitle).toBe('Entry 2');  
  }); 


  // define and implement test16: Verify the entry page contents is correct when clicking on the second entry
  it ('Test 16: On Entry 2 - Testing the <entry-page> contents is right', async() => {
    const realEntry ={ 
      title: 'Run, Forrest! Run!',
      date: '4/26/2021',
      content: "Mama always said life was like a box of chocolates. You never know what you're gonna get.",
      image: {
        src: 'https://s.abcnews.com/images/Entertainment/HT_forrest_gump_ml_140219_4x3_992.jpg',
        alt: 'forrest running'
      }
    };

    const entry2 = await page.$eval("body > entry-page", el => el.entry); 
    expect(entry2).toEqual(realEntry); 
  });

  // create your own test 17
  it ('Test 17: Click the setting, then header - title of page should be "Journal Entries"', async () => {
    jest.setTimeout(30000);
    await page.click('body > header > img');
    await page.click('body > header > h1');
    const headerTitle = await page.$eval('body > header > h1', el => el.textContent);
    expect(headerTitle).toBe("Journal Entries"); 
  });

  // create your own test 18
  it ('Test 18: Click on the third entry, the URL should contain /#entry3', async () => {
    await page.click('journal-entry:nth-child(3)'); 
    const pageUrl = await page.url();
    const urlSplit = pageUrl.split("/"); 
    expect(urlSplit[urlSplit.length - 1]).toBe("#entry3");
  });
  // create your own test 19
  it ('Test 19: Ensure no audio is on Entry 3', async () => {
    const aud = await page.$eval('body > entry-page', el => el.entry.audio); 
    expect(aud).toBe(); 
  });
  // create your own test 20
  it ('Test 20: Click back 4 times and body class attribute should be empty', async () =>{
    for (let i = 0; i < 4; i++){
      await page.goBack(); 
    }

    const bodyClass = await page.$eval('body', el => el.className); 
    expect(bodyClass).toBe("");
  });
});
