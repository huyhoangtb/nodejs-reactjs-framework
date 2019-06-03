import Translate from 'i18n';

export default ($this) => {
  return [
    {
      title: Translate.t1('organization detail'),
      url: `/admin/organization/${$this.props.iid}`,
      icon: {
        position: 'left',
        type: 'bank'
      },
    },
    // {
    //   title: Translate.t1('child organization'),
    //   url: `/admin/organization/${$this.props.iid}/child`,
    //   icon: {
    //     position: 'left',
    //     type: 'setting'
    //   },
    // },
    {
      title: Translate.t1('staffs'),
      url: `/admin/organization/${$this.props.iid}/staffs`,
      icon: {
        position: 'left',
        type: 'setting'
      },
    },
    // {
    //   title: Translate.t1('domains'),
    //   url: `/admin/organization/${$this.props.iid}/domains`,
    //   icon: {
    //     position: 'left',
    //     type: 'setting'
    //   },
    // }
  ]
}
