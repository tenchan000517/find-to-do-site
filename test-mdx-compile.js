const { getAllPosts, getPostBySlug } = require('./src/lib/mdx');

async function testMDXCompilation() {
  console.log('Starting MDX compilation test...');
  console.time('getAllPosts');
  
  try {
    const posts = await getAllPosts();
    console.log(`Found ${posts.length} posts`);
    console.timeEnd('getAllPosts');
    
    // Test compiling each post
    let successCount = 0;
    let errorCount = 0;
    
    for (const post of posts) {
      console.log(`\nProcessing: ${post.slug}`);
      console.time(post.slug);
      
      try {
        const compiled = await getPostBySlug(post.slug);
        if (compiled) {
          successCount++;
          console.log(`✓ Success: ${post.slug}`);
        } else {
          errorCount++;
          console.log(`✗ Failed (null): ${post.slug}`);
        }
      } catch (error) {
        errorCount++;
        console.log(`✗ Error: ${post.slug} - ${error.message}`);
      }
      
      console.timeEnd(post.slug);
    }
    
    console.log(`\n\nSummary:`);
    console.log(`Total posts: ${posts.length}`);
    console.log(`Successful: ${successCount}`);
    console.log(`Failed: ${errorCount}`);
    
  } catch (error) {
    console.error('Error in getAllPosts:', error);
  }
}

testMDXCompilation();