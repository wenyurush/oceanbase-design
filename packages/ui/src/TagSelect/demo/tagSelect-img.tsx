import {TagSelect} from '@oceanbase/ui';

export default () => {

    return (
       <div>
            <TagSelect.Item cover={'https://gw-office.alipayobjects.com/bmw-prod/4e085e0f-8e35-4fe6-925c-cdc2c2036cef.png'} />
            <TagSelect.Item cover={
                <img src={'https://gw-office.alipayobjects.com/bmw-prod/4e085e0f-8e35-4fe6-925c-cdc2c2036cef.png'} />
            } />
       </div> 
    );
};