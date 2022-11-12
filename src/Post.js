import React from "react";

class Post extends Component {
    constructor(props) {
        super(props);
    }
    state = {  }
    render() { 
        return ( <body>
            <h1 >Post</h1>
              <br/>
            <div class="container rcorners2">
              <label for="Tpic">Topic</label><br/>
              &nbsp;<input name="Tpic" type="text" cols="35" class="rcorners2" id="Tpic"/><br/>
              <label for="Dcpt">Description</label><br/>
              &nbsp;<textarea name="freeform" cols="35" rows="5" class="rcorners2" id="freeform">
            </textarea>
                <div>
              Tags<br/></div>
                  <div>
                Type<br/>&nbsp;
            <label>
                  <input type="checkbox" data-limit="only-one-in-a-group" name="groupOne" value="Eat" />
                    ส่งต่อ        </label>
                <label>
                    <input type="checkbox" data-limit="only-one-in-a-group" name="groupOne" value="Sleep" />
                    ตามหา</label>
            </div>
                      
              <label for="InImg">Image&nbsp;</label>
              <br/>
            <form action="upload.php" method="post">
                &nbsp;<input type="file" name="file" id="file"/>
            </form>
                &nbsp; &nbsp;<br/>
              <button type="button" class="btn btn-primary" align="center">Post</button>
            </div>
            
              </body> );
    }
}
 
export default Post;